import Dialog from "react-native-dialog";
import { useColorScheme, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

// TODO: Reuse this for month picker.
export default function DropdownDialog({
  isVisible,
  onCancel,
  onConfirm,
  value,
  options,
  labelExtractor,
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
          {options.map((value) => (
            <Picker.Item
              key={value}
              label={labelExtractor(value)}
              value={value}
            />
          ))}
        </Picker>

        <Dialog.Button label="Cancel" onPress={() => onCancel()} />
        <Dialog.Button label="Save" onPress={() => onConfirm(input)} />
      </Dialog.Container>
    </View>
  );
}
