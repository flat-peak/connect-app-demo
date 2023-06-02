import { TouchableOpacity } from "react-native";
import { Text } from "../common/Text";

import styled from "styled-components/native";

const guidingButton = (theme) => `
    background-color: ${theme.colors.buttons.guiding};
    border-color: ${theme.colors.text.guidingButton};
    border-width: 1px;
`;

const executiveButton = (theme) => `
    background-color: ${theme.colors.buttons.executive};
`;

const destructiveButton = (theme) => `
    background-color: ${theme.colors.buttons.destructive};
    margin-top: 8px;
    height: 38px;
`;

const link = (theme) => `
    background: transparent;
    margin-top: 14px;
    color: #ffffff;
    text-decoration: underline;
`;

const variants = {
  guiding: guidingButton,
  executive: executiveButton,
  destructive: destructiveButton,
  link: link,
};

export const ButtonContainer = styled.View`
  margin-top: 24px;
  border-radius: ${({ theme }) => theme.buttonRoundness}px;
  height: ${({ size }) => (size === "small" ? 44 : 64)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  ${({ variant, theme }) => variants[variant](theme)}
`;

ButtonContainer.defaultProps = {
  type: "guiding",
};

export default function Button({
  title,
  subTitle,
  variant = "guiding",
  onPress,
  disabled,
  size,
}) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <ButtonContainer variant={variant} disabled={disabled} size={size}>
        <Text variant={variant + "-button"}>{title}</Text>
        {subTitle && <Text variant={variant + "-button-sub"}>{subTitle}</Text>}
      </ButtonContainer>
    </TouchableOpacity>
  );
}
