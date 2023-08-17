import styled from "styled-components/native";
import { TextInput as NativeTextInput } from "react-native";

export const TextInput = styled(NativeTextInput)`
  background-color: #ffffff;
  height: 44px;
  border-radius: 10px;
  padding: 0 18px;
  font-family: ${({ theme }) => theme.fonts.body};
  border: 1px solid ${({ theme }) => theme.colors.body};
`;
