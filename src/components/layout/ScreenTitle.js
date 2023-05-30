import styled from "styled-components/native";
import { Text } from "../common/Text";

const ScreenTitleContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 16px ${({ theme }) => theme.screenHorizontalOffset}px 12px;
`;

const ScreenSubTitleContainer = styled.View`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px ${({ theme }) => theme.screenHorizontalOffset}px 12px;
`;

const ScreenTitleText = styled.Text`
  ${({ theme }) => `
    color: ${theme.colors.text.heading};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.heading}px;
    line-height: ${theme.fontSizes.heading * 1.5}px;
    text-align: left;
  `}
`;
export default function ScreenTitle({ title, subTitle }) {
  return (
    <>
      <ScreenTitleContainer>
        <ScreenTitleText>{title}</ScreenTitleText>
      </ScreenTitleContainer>
      {subTitle && (
        <ScreenSubTitleContainer>
          <Text variant="sub-heading">{subTitle}</Text>
        </ScreenSubTitleContainer>
      )}
    </>
  );
}
