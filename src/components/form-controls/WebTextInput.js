import styled from "styled-components/native";
import { TextInput as NativeTextInput } from "react-native";

export const WebTextInput = styled(NativeTextInput)`
  background-color: transparent;
  height: 44px;
  border-radius: 0;
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.body};
  border-bottom-color: ${({ theme }) => theme.colors.body};
  border-bottom-width: 1px;
  font-size: 20px;
`;
