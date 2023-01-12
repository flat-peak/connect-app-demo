import { TouchableOpacity } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import styled from "styled-components/native";

const CheckboxContainer = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: 19px;
  height: 64px;
  box-sizing: border-box;
  padding: 0 15px;
  border-color: ${({ theme }) => theme.colors.text.guidingButton};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.roundness}px;
`;

const CheckboxIcon = styled(Fontisto).attrs(({ checked, theme }) => ({
  name: checked ? "checkbox-active" : "checkbox-passive",
  size: 22,
  color: theme.colors.text.uiControl,
}))`
  position: absolute;
  left: 15px;
`;

const CheckboxLabel = styled.Text`
  margin-left: 40px;
  color: ${({ theme }) => theme.colors.text.uiControl};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 19px;
  line-height: 23px;
`;

export default function Checkbox({ title, value, onChange }) {
  return (
    <CheckboxContainer onPress={() => onChange && onChange(!value)}>
      <CheckboxIcon checked={!!value} />
      <CheckboxLabel>{title}</CheckboxLabel>
    </CheckboxContainer>
  );
}
