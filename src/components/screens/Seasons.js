import Header from "../layout/Header";
import { FlatList, TouchableOpacity } from "react-native";
import Button from "../form-controls/Button";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../theme/secondary";
import { ThemeProvider } from "styled-components";
import { ScreenSafeView } from "../layout/View";
import { useRef, useState } from "react";
import MonthPickerDialog from "../dialogs/month-picker-dialog";
import Footer from "../layout/Footer";
import Wrapper from "../layout/Wrapper";
import {
  EditableTableBox,
  EditableTableBoxes,
  EditableTableControl,
  EditableTableLabel,
  EditableTableRow,
  EditableTableValue,
} from "../common/EditableTable";
import { resolveMonthLabelByKey } from "../../data/tariff-constants";

/**
 *
 * @param navigation
 * @param route
 * @param {Tariff} plan
 * @param setSeasonRange
 * @param addSeasonRange
 * @param removeSeasonRange
 * @param findWeekdaySchedule
 * @return {JSX.Element}
 * @constructor
 */
export default function Seasons({
  navigation,
  route,
  plan,
  setSeasonRange,
  addSeasonRange,
  removeSeasonRange,
  findWeekdaySchedule,
}) {
  const { side } = route.params;

  /** @type {TariffSchedule} */
  const schedule = findWeekdaySchedule(plan[side]);

  const removePeriod = (index) => {
    removeSeasonRange({ side, index });
  };
  const addPeriod = () => {
    addSeasonRange({ side });
  };

  const [isPricePickerOpen, setMonthPickerOpen] = useState(false);

  const lastSelectedMonth = useRef(null);

  const hideMonthPicker = () => {
    setMonthPickerOpen(false);
  };

  const openMonthPicker = (item, value, type) => {
    lastSelectedMonth.current = {
      type,
      item,
      value,
    };
    setMonthPickerOpen(true);
  };

  const handleConfirmMonth = (value) => {
    const payload = {
      side,
      value: value,
      index: schedule.data.indexOf(lastSelectedMonth.current.item),
      type: lastSelectedMonth.current.type,
    };
    setSeasonRange(payload);
    hideMonthPicker();
  };

  return (
    <ThemeProvider theme={theme}>
      <ScreenSafeView edges={["right", "left", "bottom"]}>
        <Header
          title={side[0].toUpperCase() + side.substring(1) + " tariff seasons"}
          subTitle={"Create seasons that match your tariff"}
        />
        <Wrapper>
          <MonthPickerDialog
            isVisible={isPricePickerOpen}
            value={lastSelectedMonth.current?.value}
            onConfirm={handleConfirmMonth}
            onCancel={hideMonthPicker}
          />
          <FlatList
            ListFooterComponent={
              <Button title={"Add season period"} onPress={() => addPeriod()} />
            }
            data={schedule.data}
            renderItem={({ item, index }) => {
              let firstMonth = item.months[0] || "";
              let lastMonth =
                item.months.length > 1
                  ? item.months[item.months.length - 1]
                  : "";
              return (
                <EditableTableRow>
                  <EditableTableBoxes>
                    <EditableTableBox
                      isFirst={true}
                      onPress={() => openMonthPicker(item, firstMonth, "from")}
                    >
                      <EditableTableLabel>From:</EditableTableLabel>
                      <EditableTableValue>
                        {resolveMonthLabelByKey(firstMonth)}
                      </EditableTableValue>
                    </EditableTableBox>
                    <EditableTableBox
                      onPress={() => openMonthPicker(item, lastMonth, "to")}
                    >
                      <EditableTableLabel>To:</EditableTableLabel>
                      <EditableTableValue>
                        {resolveMonthLabelByKey(lastMonth)}
                      </EditableTableValue>
                    </EditableTableBox>
                  </EditableTableBoxes>
                  <EditableTableControl>
                    {schedule.data.length > 1 && (
                      <TouchableOpacity onPress={() => removePeriod(index)}>
                        <Ionicons name="trash" size={24} color="#FF8484" />
                      </TouchableOpacity>
                    )}
                  </EditableTableControl>
                </EditableTableRow>
              );
            }}
          />

          <Footer>
            <Button
              title={"Next"}
              variant="executive"
              onPress={() =>
                navigation.push("Prices", {
                  side,
                  seasonIndex: 0,
                  daysIndex: 0,
                })
              }
            />
          </Footer>
        </Wrapper>
      </ScreenSafeView>
    </ThemeProvider>
  );
}
