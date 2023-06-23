import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as PropTypes from "prop-types";
import { ScrollView } from "react-native";

KeyboardAwareScrollView.propTypes = {
  scrollEnabled: PropTypes.bool,
  resetScrollToCoords: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  style: PropTypes.shape({ backgroundColor: PropTypes.string }),
  children: PropTypes.node,
};

export const FieldSet = (props) => (
  <ScrollView>
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      extraScrollHeight={-130}
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1, paddingVertical: 8 }}
      {...props}
    />
  </ScrollView>
);
