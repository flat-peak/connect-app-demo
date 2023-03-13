import { Text } from "../common/Text";
import styled from "styled-components/native";
import { Image } from "react-native";
import LogoImage from "../../../assets/fp-demo.png";

const HeaderContainer = styled.View`
  padding: 12px ${({ theme }) => theme.screenHorizontalOffset}px;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;

export default function Header({ title, subTitle, useLogo }) {
  return (
    <HeaderContainer>
      {useLogo && (
        <Image
          style={{
            width: 252,
            height: 25,
            resizeMode: "cover",
            marginBottom: 8,
            alignSelf: "center",
          }}
          source={LogoImage}
        />
      )}
      <Text variant="heading">{title}</Text>
      {subTitle && <Text variant="sub-heading">{subTitle}</Text>}
    </HeaderContainer>
  );
}
