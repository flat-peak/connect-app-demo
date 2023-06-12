import { Platform, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBarHeight } from "../../global/status-bar-height";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import { selectProvider } from "../../store/reducers/tariffReducer";
import ProviderLogo from "../common/ProviderLogo";

const ProviderWrapper = styled.View`
  flex: 1;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const NavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ statusBarHeight }) => statusBarHeight || 0}px
    ${({ theme }) => theme.screenHorizontalOffset}px 0;
  border-bottom-width: ${({ border }) => (border ? 1 : 0)}px;
`;

const NavBarControl = styled(TouchableOpacity)`
  margin: 0 -16px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavBarIcon = styled(AntDesign).attrs(({ glyph, theme }) => ({
  name: glyph,
  size: 24,
  color: theme.colors.buttons.nav,
}))``;

export default function NavBar({ navigation, options, border }) {
  const insets = useSafeAreaInsets();
  let statusBarHeight = Platform.select({
    android: StatusBarHeight,
    ios: insets.top,
  });
  const provider = useSelector(selectProvider);
  return (
    <NavBarContainer statusBarHeight={statusBarHeight} border={border}>
      <View>
        {navigation.canGoBack() && (
          <NavBarControl onPress={() => navigation.goBack()}>
            <NavBarIcon glyph="left" />
          </NavBarControl>
        )}
      </View>
      {options.displayProviderLogo && provider && (
        <ProviderWrapper>
          <ProviderLogo item={provider} />
        </ProviderWrapper>
      )}
      <View>
        {navigation.canGoBack() && (
          <NavBarControl onPress={() => navigation.popToTop()}>
            <NavBarIcon glyph="close" />
          </NavBarControl>
        )}
      </View>
    </NavBarContainer>
  );
}
