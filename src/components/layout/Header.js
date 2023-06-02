import { Text } from "../common/Text";
import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";
import LogoImage from "../../../assets/fp-logo-demo-alt.png";
import { AntDesign } from "@expo/vector-icons";

const HeaderContainer = styled.View`
  padding: 12px 0px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

const NavBarContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: ${({ statusBarHeight }) => statusBarHeight || 0}px
    ${({ theme }) => theme.screenHorizontalOffset}px 0;
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

export default function Header({
  title,
  subTitle,
  useLogo,
  navigation,
  useNav = true,
}) {
  return (
    <HeaderContainer>
      {useLogo && (
        <Image
          style={{
            width: 152,
            height: 31,
            resizeMode: "cover",
            alignSelf: "center",
          }}
          source={LogoImage}
        />
      )}
      <NavBarContainer>
        <NavBarControlPh>
          {navigation.canGoBack() && useNav && (
            <NavBarControl onPress={() => navigation.goBack()}>
              <NavBarIcon glyph="left" />
            </NavBarControl>
          )}
        </NavBarControlPh>
        <TitleContainer>
          <Text variant="heading">{title}</Text>
        </TitleContainer>
        <NavBarControlPh>
          {navigation.canGoBack() && useNav && (
            <NavBarControl onPress={() => navigation.popToTop()}>
              <NavBarIcon glyph="close" />
            </NavBarControl>
          )}
        </NavBarControlPh>
      </NavBarContainer>
      {subTitle && <Text variant="sub-heading">{subTitle}</Text>}
    </HeaderContainer>
  );
}
