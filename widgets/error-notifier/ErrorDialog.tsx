import { View } from "react-native";
import Dialog from "react-native-dialog";

export default function ErrorDialog({ isVisible, title, message, onDismiss }) {
  return (
    <View>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>{message}</Dialog.Description>
        <Dialog.Button label="OK" onPress={() => onDismiss()} />
      </Dialog.Container>
    </View>
  );
}
