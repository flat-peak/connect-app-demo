import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, StatusBar } from "react-native";

const ScreenContainerRoot = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 0 ${({ bottomHandleHeight }) => bottomHandleHeight}px;
`;

export default function SafeScreen({ children }) {
  const insets = useSafeAreaInsets();
  let bottomHandleHeight = Platform.select({
    android: 0,
    ios: insets.bottom,
  });
  let statusBarHeight = Platform.select({
    android: StatusBar.currentHeight,
    ios: insets.top,
  });

  return (
    <ScreenContainerRoot
      bottomHandleHeight={bottomHandleHeight}
      statusBarHeight={statusBarHeight}
    >
      {children}
    </ScreenContainerRoot>
  );
}
