import { Text, Divider } from "@app/shared/ui";
import styled from "styled-components/native";
import { Platform, StatusBar, TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import Logo from "./Logo";

const HeaderContainer = styled.View`
  padding: ${({ statusBarHeight }) => statusBarHeight + 12}px 0
    ${({ inModal }) => (inModal ? 0 : 12)}px 0px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

const NavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ statusBarHeight }) => statusBarHeight || 0}px 24px 0;
`;

const NavBarControlPh = styled.View`
  height: 48px;
  margin: 0 -16px;
`;

const NavBarControl = styled(TouchableOpacity)`
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

const TitleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImage = styled.Image`
  width: 152px;
  height: 31px;
  align-self: center;
`;

export type HeaderProps = {
  title: string;
  subTitle?: string;
  useLogo?: boolean;
  useNav?: boolean;
  inModal?: boolean;
  goBackHandler?: () => void;
};

export default function Header(props: HeaderProps) {
  const {
    title,
    subTitle = "",
    useLogo = true,
    useNav = true,
    inModal = false,
    goBackHandler,
  } = props;

  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  const insets = useSafeAreaInsets();
  const statusBarHeight = inModal
    ? 0
    : Platform.select({
        android: StatusBar.currentHeight,
        ios: insets.top,
      });

  return (
    <HeaderContainer statusBarHeight={statusBarHeight} inModal={inModal}>
      {useLogo && <LogoImage source={Logo} />}
      <NavBarContainer>
        <NavBarControlPh>
          {(canGoBack || goBackHandler) && useNav && (
            <NavBarControl
              onPress={() =>
                goBackHandler ? goBackHandler() : navigation.goBack()
              }
            >
              <NavBarIcon glyph="left" />
            </NavBarControl>
          )}
        </NavBarControlPh>
        <TitleContainer>
          <Text variant="heading">{title}</Text>
        </TitleContainer>
        <NavBarControlPh>
          {canGoBack && useNav && (
            <NavBarControl
              onPress={() =>
                (navigation as unknown as { popToTop: () => void }).popToTop()
              }
            >
              <NavBarIcon glyph="close" />
            </NavBarControl>
          )}
        </NavBarControlPh>
      </NavBarContainer>
      {subTitle && <Text variant="sub-heading">{subTitle}</Text>}
      <Divider />
    </HeaderContainer>
  );
}

export const HeaderFactory =
  ({ useNav }) =>
  (params) => {
    return (
      <Header
        title={params.options.title}
        useNav={useNav}
        inModal={params.options.presentation === "modal"}
      />
    );
  };
