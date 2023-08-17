import { ScrollView, StyleSheet } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from "react-native-keyboard-aware-scroll-view";

export const FieldSet = (props: KeyboardAwareScrollViewProps) => (
  <ScrollView>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      extraScrollHeight={-130}
      scrollEnabled={true}
      contentContainerStyle={styles.fieldset}
      {...props}
    />
  </ScrollView>
);

const styles = StyleSheet.create({
  fieldset: { flex: 1, paddingVertical: 8 },
});
