import { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { Text } from "./Text";

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

const link = () => `
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
  border-radius: 10px;
  height: ${({ size }) => (size === "small" ? 44 : 64)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  ${({ variant, theme }) => variants[variant](theme)}
`;

type ButtonProps = {
  title: string;
  subTitle?: string;
  variant?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: "small" | "default";
};
export default function Button(props: PropsWithChildren<ButtonProps>) {
  const {
    title,
    subTitle,
    variant = "guiding",
    onPress,
    disabled,
    size,
  } = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <ButtonContainer variant={variant} disabled={disabled} size={size}>
        <Text variant={variant + "-button"}>{title}</Text>
        {subTitle && <Text variant={variant + "-button-sub"}>{subTitle}</Text>}
      </ButtonContainer>
    </TouchableOpacity>
  );
}
