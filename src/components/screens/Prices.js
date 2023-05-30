import { FlatList, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import Button from "../form-controls/Button";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "../form-controls/Checkbox";
import PeriodCaption from "../common/PeriodCaption";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { addLeadingZero } from "../../global/peak-utils";
import EditPriceDialog from "../dialogs/edit-price-dialog";
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
  EditableTableLabel,
  EditableTableRow,
  EditableTableValue,
} from "../common/EditableTable";
import {
  resolveMonthLabelByKey,
  TARIFF_ALL_MONTHS,
  TARIFF_DAYS,
  TARIFF_MONTH_LABELS,
  TARIFF_SIDE,
  TARIFF_WEEKDAYS,
  TARIFF_WEEKEND,
} from "../../data/tariff-constants";
import { isEqualObjects } from "../../global/common";
import {
  addPriceRange,
  findWeekdaySchedule,
  isTimeConfigurable,
  removePriceRange,
  selectPlan,
  setPrice,
  setSamePrices,
} from "../../store/reducers/tariffReducer";
import { useDispatch, useSelector } from "react-redux";
import ScreenTitle from "../layout/ScreenTitle";

export default function Prices({ navigation, route }) {
  const plan = useSelector(selectPlan);
  const dispatch = useDispatch();
  const [sameSchedule, setSameSchedule] = useState(false);
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

  const flat = !isTimeConfigurable(schedule);

  useEffect(() => {
    if (!isWeekendMode || !weekdaysPriceRange) {
      return;
    }

    setSameSchedule(
      isEqualObjects(currentPriceRange.hours, weekdaysPriceRange.hours)
    );
  }, [weekdaysPriceRange, currentPriceRange, isWeekendMode]);

  const displayPeriods = !flat && (!isWeekendMode || !sameSchedule);
  const displayCaptions = !flat;
  const displaySinglePrice = flat;

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
    if (flat) {
      return "All-year";
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
  const lastSelectedPrice = useRef(null);

  const [isTimepickerOpen, setTimepickerOpen] = useState(false);
  const [isPricePickerOpen, setPricePickerOpen] = useState(false);

  const openPricePicker = (item, index) => {
    const { valid_from: from, valid_to: to, cost } = item;
    lastSelectedPrice.current = {
      cost: cost.toString(),
      description: `${from.substring(0, 5)} - ${to.substring(0, 5)}`,
      index,
    };
    setPricePickerOpen(true);
  };

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

  const hidePricePicker = () => {
    setPricePickerOpen(false);
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

  const handleConfirmPrice = (value) => {
    const priceIndex = lastSelectedPrice.current.index;
    const targetPriceEl = currentPriceRange.hours[priceIndex];

    if (targetPriceEl) {
      let normalizedPrice = (parseFloat(value) || 0).toFixed(2);
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
    }

    hidePricePicker();
  };

  const months = schedule.data[seasonIndex].months;

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <ScreenTitle title={getCaption()} subTitle={getDescription()} />
        <Wrapper>
          {displayCaptions && (
            <PeriodCaption
              monthFrom={
                months[0] === TARIFF_ALL_MONTHS
                  ? TARIFF_MONTH_LABELS[0]
                  : resolveMonthLabelByKey(months[0])
              }
              monthTo={
                months[0] === TARIFF_ALL_MONTHS
                  ? TARIFF_MONTH_LABELS[11]
                  : resolveMonthLabelByKey(months[months.length - 1])
              }
              dayFrom={isWeekendMode ? "Sat" : "Mon"}
              dayTo={isWeekendMode ? "Sun" : "Fri"}
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
            <EditPriceDialog
              isVisible={isPricePickerOpen}
              value={lastSelectedPrice.current?.cost}
              description={lastSelectedPrice.current?.description}
              onConfirm={handleConfirmPrice}
              onCancel={hidePricePicker}
            />
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
                            onPress={() => openPricePicker(item, index)}
                          >
                            <EditableTableLabel>Price:</EditableTableLabel>
                            <EditableTableValue
                              isLong={String(item.cost).length > 5}
                            >
                              £{Number(item.cost || 0).toFixed(2)}
                            </EditableTableValue>
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
                      onPress={() =>
                        openPricePicker(currentPriceRange.hours[0], 0)
                      }
                    >
                      <EditableTableLabel>Price:</EditableTableLabel>
                      <EditableTableValue>
                        £{currentPriceRange.hours[0].cost}
                      </EditableTableValue>
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
