import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Text } from "../common/Text";
import { Fontisto } from "@expo/vector-icons";

export const ButtonContainer = styled.View`
  margin-top: 24px;
  background-color: ${({ theme }) => theme.colors.buttons.guiding};
  border-color: ${({ theme }) => theme.colors.text.guidingButton};
  border-width: 1px;
  border-radius: ${({ theme }) => theme.roundness}px;
  height: 64px;
  align-items: center;
  justify-content: center;
  opacity: ${({ checked }) => (checked ? 1 : 0.5)};
`;

const CheckboxIcon = styled(Fontisto).attrs(({ checked, theme }) => ({
  name: checked ? "checkbox-active" : "checkbox-passive",
  size: 22,
  color: theme.colors.text.uiControl,
}))`
  position: absolute;
  left: 15px;
`;

export default function ButtonCheckbox({ title, subTitle, value, onChange }) {
  return (
    <TouchableOpacity onPress={() => onChange && onChange(!value)}>
      <ButtonContainer checked={!!value}>
        <CheckboxIcon checked={!!value} />
        <Text variant={"guiding-button"}>{title}</Text>
        {subTitle && <Text variant={"guiding-button-sub"}>{subTitle}</Text>}
      </ButtonContainer>
    </TouchableOpacity>
  );
}
