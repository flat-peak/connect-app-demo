import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const defaultViewStyles = (theme) => `
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const ScreenView = styled.View`
  ${({ theme }) => defaultViewStyles(theme)}
`;

export const ScreenSafeView = styled(SafeAreaView)`
  ${({ theme }) => defaultViewStyles(theme)}
`;

export const ScreenScrollView = styled(ScrollView)`
  ${({ theme }) => defaultViewStyles(theme)}
`;
