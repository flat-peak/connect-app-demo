import { FlatList, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import useDynamicRefs from "use-dynamic-refs";

import Button from "../form-controls/Button";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "../form-controls/Checkbox";
import PeriodCaption from "../common/PeriodCaption";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addLeadingZero } from "../../global/peak-utils";
import { theme } from "../../theme/secondary";
import { ScreenSafeView } from "../layout/View";
import { ThemeProvider } from "styled-components";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";
import Main from "../layout/Main";
import {
  EditableTableBox,
  EditableTableBoxes,
  EditableTableControl,
  EditableTableInput,
  EditableTableLabel,
  EditableTableRow,
  EditableTableValue,
} from "../common/EditableTable";
import {
  resolveMonthLabelByKey,
  TARIFF_DAYS,
  TARIFF_SIDE,
  TARIFF_WEEKDAYS,
  TARIFF_WEEKEND,
} from "../../data/tariff-constants";
import { isEqualObjects } from "../../global/common";
import {
  addPriceRange,
  findWeekdaySchedule,
  getEndDayOfRange,
  getEndMonthOfRange,
  getStartDayOfRange,
  getStartMonthOfRange,
  removePriceRange,
  selectPlan,
  selectStructure,
  setPrice,
  setSamePrices,
} from "../../store/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";
import ScreenTitle from "../layout/ScreenTitle";

export default function Prices({ navigation, route }) {
  const plan = useSelector(selectPlan);
  const structure = useSelector(selectStructure);
  const dispatch = useDispatch();
  const [sameSchedule, setSameSchedule] = useState(false);
  const [getRef, setRef] = useDynamicRefs();
  const { side, seasonIndex, daysIndex } = route.params;

  const schedule = findWeekdaySchedule(plan[side]);
  const daysPresets = schedule.data[seasonIndex].days_and_hours;

  const currentPriceRange = daysPresets[daysIndex];

  const daysHash = currentPriceRange.days.join(",");
  const isWeekendMode = [
    TARIFF_WEEKEND,
    TARIFF_DAYS.slice(5, 7).join(","),
  ].includes(daysHash);

  const isWeekdaysMode = [
    TARIFF_WEEKDAYS,
    TARIFF_DAYS.slice(0, 5).join(","),
  ].includes(daysHash);

  const weekdaysPriceRange = isWeekdaysMode
    ? currentPriceRange
    : daysPresets.find((preset) => {
        return [TARIFF_WEEKDAYS, TARIFF_DAYS.slice(0, 5).join(",")].includes(
          preset.days.join(",")
        );
      });

  const flat = !structure.hours;

  useEffect(() => {
    if (!isWeekendMode || !weekdaysPriceRange) {
      return;
    }

    setSameSchedule(
      isEqualObjects(currentPriceRange.hours, weekdaysPriceRange.hours)
    );
  }, [weekdaysPriceRange, currentPriceRange, isWeekendMode]);

  const displayPeriods = structure.hours && (!isWeekendMode || !sameSchedule);
  const displayCaptions = structure.months || structure.days;
  const displaySinglePrice =
    !structure.hours && (!isWeekendMode || !sameSchedule);

  const toggleSameSchedule = (checked) => {
    setSameSchedule(checked);
    if (checked) {
      dispatch(
        setSamePrices({
          side,
          seasonIndex,
          daysIndex,
          weekdaysIndex: daysPresets.indexOf(weekdaysPriceRange),
        })
      );
    }
  };

  const removePeriod = (priceIndex) => {
    dispatch(removePriceRange({ side, seasonIndex, daysIndex, priceIndex }));
  };

  const addPeriod = () => {
    dispatch(addPriceRange({ side, seasonIndex, daysIndex }));
  };

  const getCaption = () => {
    return side === TARIFF_SIDE.IMPORT
      ? flat
        ? "Cost of electricity"
        : "Time of day prices"
      : "Prices you paid";
  };

  const getDescription = () => {
    if (!structure.months) {
      return `Adjust cost per kWh for your ${
        side === TARIFF_SIDE.IMPORT ? "import" : "export"
      } tariff`;
    }
    return `Adjust cost per kWh for your ${
      side === TARIFF_SIDE.IMPORT ? "import" : "export"
    } tariff. Add more periods as required.`;
  };

  const getNextScreenParams = () => {
    if (daysIndex < daysPresets.length - 1) {
      return {
        id: "Prices",
        params: {
          side,
          seasonIndex: seasonIndex,
          daysIndex: daysIndex + 1,
        },
      };
    } else if (seasonIndex < schedule.data.length - 1) {
      return {
        id: "Prices",
        params: {
          side,
          seasonIndex: seasonIndex + 1,
          daysIndex: 0,
        },
      };
    } else if (side === TARIFF_SIDE.IMPORT && plan[TARIFF_SIDE.EXPORT]) {
      return {
        id: "TariffStructure",
        params: {
          side: TARIFF_SIDE.EXPORT,
        },
      };
    } else {
      return {
        id: "Summary",
      };
    }
  };

  const lastSelectedTime = useRef(null);
  const [isTimepickerOpen, setTimepickerOpen] = useState(false);

  const openTimePicker = (item, pickMode, index) => {
    const { valid_from: from, valid_to: to } = item;
    const targetTime = pickMode === "from" ? from : to;
    const date = new Date();
    if (targetTime) {
      const [hours, minutes] = targetTime.substring(0, 5).split(":");
      date.setHours(Number(hours) || 0, Number(minutes) || 0, 0, 0);
    }
    lastSelectedTime.current = {
      from,
      to,
      mode: pickMode,
      date,
      index,
    };
    setTimepickerOpen(true);
  };
  const hideDatePicker = () => {
    setTimepickerOpen(false);
  };

  const handleConfirmTime = (date) => {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    const priceIndex = lastSelectedTime.current.index;
    const targetPriceEl = currentPriceRange.hours[priceIndex];
    if (targetPriceEl) {
      dispatch(
        setPrice({
          price: {
            ...targetPriceEl,
            ["valid_" + lastSelectedTime.current.mode]:
              [addLeadingZero(hours), addLeadingZero(minutes)].join(":") +
              ":00",
          },
          side,
          seasonIndex,
          daysIndex,
          priceIndex,
        })
      );
    }

    hideDatePicker();
  };

  const validatePrice = (priceIndex) => {
    const targetPriceEl = currentPriceRange.hours[priceIndex];
    if (!targetPriceEl) {
      return;
    }
    const value = targetPriceEl.cost;
    let normalizedPrice = (
      Math.floor((parseFloat(String(value)) || 0) * 100) / 100
    ).toFixed(2);
    dispatch(
      setPrice({
        price: {
          ...targetPriceEl,
          cost: Number(normalizedPrice),
        },
        side,
        seasonIndex,
        daysIndex,
        priceIndex,
      })
    );
  };
  const updatePrice = (value, priceIndex) => {
    const targetPriceEl = currentPriceRange.hours[priceIndex];
    if (!targetPriceEl) {
      return;
    }
    dispatch(
      setPrice({
        price: {
          ...targetPriceEl,
          cost: value,
        },
        side,
        seasonIndex,
        daysIndex,
        priceIndex,
      })
    );
  };

  const months = schedule.data[seasonIndex].months;
  const valid = currentPriceRange.hours.every((h) => Number(h.cost) > 0);

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <ScreenTitle title={getCaption()} subTitle={getDescription()} />
        <Wrapper>
          {displayCaptions && (
            <PeriodCaption
              monthFrom={resolveMonthLabelByKey(getStartMonthOfRange(months))}
              monthTo={resolveMonthLabelByKey(getEndMonthOfRange(months))}
              dayFrom={getStartDayOfRange(currentPriceRange.days)}
              dayTo={getEndDayOfRange(currentPriceRange.days)}
            />
          )}
          {isWeekendMode && weekdaysPriceRange && (
            <Checkbox
              value={sameSchedule}
              defaultChecked={false}
              title={"My tariff is same on weekdays and weekend"}
              onChange={(checked) => toggleSameSchedule(checked)}
            />
          )}

          <Main>
            {displayPeriods && (
              <View style={{ paddingTop: 18 }}>
                <DateTimePickerModal
                  isVisible={isTimepickerOpen}
                  date={lastSelectedTime.current?.date}
                  mode="time"
                  locale="en-GB"
                  is24Hour={true}
                  onConfirm={handleConfirmTime}
                  onCancel={hideDatePicker}
                />

                <FlatList
                  data={currentPriceRange.hours}
                  keyExtractor={(item, index) => index.toString(10)}
                  ListFooterComponent={
                    <Button
                      size={"small"}
                      style={{ margin: 0 }}
                      title={"+ Add time period"}
                      onPress={() => addPeriod()}
                    />
                  }
                  renderItem={({ item, index }) => {
                    return (
                      <EditableTableRow
                        isLast={index === currentPriceRange.hours.length - 1}
                      >
                        <EditableTableBoxes>
                          <EditableTableBox
                            isFirst={true}
                            onPress={() => openTimePicker(item, "from", index)}
                          >
                            <EditableTableLabel>From:</EditableTableLabel>
                            <EditableTableValue>
                              {item.valid_from.substring(0, 5)}
                            </EditableTableValue>
                          </EditableTableBox>
                          <EditableTableBox
                            onPress={() => openTimePicker(item, "to", index)}
                          >
                            <EditableTableLabel>To:</EditableTableLabel>
                            <EditableTableValue>
                              {item.valid_to.substring(0, 5)}
                            </EditableTableValue>
                          </EditableTableBox>
                          <EditableTableBox
                            onPress={() =>
                              getRef(`cost_${index}`)?.current?.focus()
                            }
                          >
                            <EditableTableLabel>Price:</EditableTableLabel>
                            <EditableTableInput
                              isLong={String(item.cost).length > 5}
                              inputMode={"decimal"}
                              autoComplete={"off"}
                              autoCorrect={false}
                              blurOnSubmit={true}
                              enterKeyHint={"done"}
                              clearTextOnFocus={!String(item.cost)}
                              ref={setRef(`cost_${index}`)}
                              onChangeText={(value) =>
                                updatePrice(value, index)
                              }
                              onBlur={() => validatePrice(index)}
                              value={String(item.cost)}
                            />
                          </EditableTableBox>
                        </EditableTableBoxes>

                        <EditableTableControl>
                          {currentPriceRange.hours.length > 1 && (
                            <TouchableOpacity
                              onPress={() => removePeriod(index)}
                            >
                              <Ionicons
                                name="trash"
                                size={24}
                                color="#FF8484"
                              />
                            </TouchableOpacity>
                          )}
                        </EditableTableControl>
                      </EditableTableRow>
                    );
                  }}
                />
              </View>
            )}
            {!displaySinglePrice ? null : (
              <View style={{ paddingTop: 18 }}>
                <EditableTableRow>
                  <EditableTableBoxes>
                    <EditableTableBox
                      isFirst={true}
                      onPress={() => getRef("cost_0")?.current?.focus()}
                    >
                      <EditableTableLabel>Price:</EditableTableLabel>
                      <EditableTableInput
                        inputMode={"decimal"}
                        autoComplete={"off"}
                        autoCorrect={false}
                        blurOnSubmit={true}
                        enterKeyHint={"done"}
                        ref={setRef("cost_0")}
                        onChangeText={(value) => updatePrice(value, 0)}
                        onBlur={() => validatePrice(0)}
                        value={String(currentPriceRange.hours[0].cost)}
                      />
                    </EditableTableBox>
                  </EditableTableBoxes>
                </EditableTableRow>
              </View>
            )}
          </Main>
          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              disabled={!valid}
              onPress={() => {
                const { id, params } = getNextScreenParams();
                navigation.push(id, params);
              }}
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
