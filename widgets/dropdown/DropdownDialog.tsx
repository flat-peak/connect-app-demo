import Dialog from "react-native-dialog";
import { StyleSheet, useColorScheme, View } from "react-native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function DropdownDialog(props) {
  const {
    isVisible,
    onCancel,
    onConfirm,
    value: currentValue,
    options,
    labelExtractor,
  } = props;

  const [input, setInputValue] = useState();
  const theme = useColorScheme();

  useEffect(() => {
    setInputValue(currentValue);
  }, [currentValue]);

  const forcedStyles = theme === "dark" ? { backgroundColor: "#fff" } : {};

  return (
    <View>
      <Dialog.Container visible={isVisible} footerStyle={forcedStyles}>
        <Picker
          style={[styles.picker, forcedStyles]}
          selectedValue={input}
          onValueChange={(itemValue) => setInputValue(itemValue)}
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

const styles = StyleSheet.create({
  picker: {
    marginTop: -36,
  },
});
