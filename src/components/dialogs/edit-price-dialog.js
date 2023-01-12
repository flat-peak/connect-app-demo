import Dialog from "react-native-dialog";
import { View } from "react-native";
import { useEffect, useState } from "react";

export default function EditPriceDialog({
  isVisible,
  description,
  onCancel,
  onConfirm,
  value,
}) {
  const [input, setInputValue] = useState(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <View>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Set price</Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Input
          keyboardType="decimal-pad"
          value={input}
          onChangeText={(v) => setInputValue(v)}
        />
        <Dialog.Button label="Cancel" onPress={() => onCancel()} />
        <Dialog.Button label="Save" onPress={() => onConfirm(input)} />
      </Dialog.Container>
    </View>
  );
}
