import Dialog from "react-native-dialog";
import { useColorScheme, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  resolveMonthLabelByKey,
  TARIFF_MONTHS,
} from "../../data/tariff-constants";

export default function MonthPickerDialog({
  isVisible,
  onCancel,
  onConfirm,
  value,
}) {
  const [input, setInputValue] = useState();
  const theme = useColorScheme();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const forcedStyles = theme === "dark" ? { backgroundColor: "#fff" } : {};

  return (
    <View>
      <Dialog.Container visible={isVisible} footerStyle={forcedStyles}>
        <Picker
          themeVariant={"dark"}
          style={{ marginTop: -36, ...forcedStyles }}
          selectedValue={input}
          onValueChange={(itemValue, itemIndex) => setInputValue(itemValue)}
        >
          {TARIFF_MONTHS.map((monthKey) => (
            <Picker.Item
              key={monthKey}
              label={resolveMonthLabelByKey(monthKey)}
              value={monthKey}
            />
          ))}
        </Picker>

        <Dialog.Button label="Cancel" onPress={() => onCancel()} />
        <Dialog.Button label="Save" onPress={() => onConfirm(input)} />
      </Dialog.Container>
    </View>
  );
}
