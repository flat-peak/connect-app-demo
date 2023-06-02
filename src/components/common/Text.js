import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
  font-family: ${theme.fonts.body};
  color: ${theme.colors.text.body};
  flex-wrap: wrap;
  margin-top: 0px;
  margin-bottom: 0px;
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body}px;
`;

const label = (theme) => `
    margin-bottom: 10px;
    font-size: 17px;
    color: #000000;
`;

const heading = (theme) => `
    color: ${theme.colors.text.heading};
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.heading}px;
    line-height: ${theme.fontSizes.heading * 1.5}px;
    text-align: ${theme.headingAlign};
`;

const intro = (theme) => `
    color: ${theme.colors.text.intro};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.intro}px;
`;

const subHeading = (theme) => `
    color: ${theme.colors.text.subHeading};
    font-family: ${theme.fonts.subHeading};
    font-size: ${theme.fontSizes.subHeading}px;
    text-align: ${theme.headingAlign};
`;

const guidingButton = (theme) => `
    color: ${theme.colors.text.guidingButton};
    font-family: ${theme.fonts.guidingButton};
    font-size: ${theme.fontSizes.button}px;
    text-align: center;
`;

const guidingButtonSub = (theme) => `
    color: ${theme.colors.text.guidingButton};
    font-family: ${theme.fonts.guidingButton};
    font-size: ${theme.fontSizes.subButton}px;
    text-align: center;
`;

const executiveButton = (theme) => `
    color: ${theme.colors.text.executiveButton};
    font-family: ${theme.fonts.executiveButton};
    font-size: ${theme.fontSizes.button}px;
    text-align: center;
`;

const destructiveButton = (theme) => `
    color: ${theme.colors.text.destructiveButton};
    font-family: ${theme.fonts.destructiveButton};
    font-size: ${theme.fontSizes.subButton}px;
    text-align: center;
`;

const uiControl = (theme) => `
    color: ${theme.colors.text.uiControl};
    font-family: ${theme.fonts.uiControl};
    font-size: ${theme.fontSizes.captions}px;
    text-align: center;
`;

const inputValue = (theme) => `
    color: ${theme.colors.text.inputField};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.inputField}px;
`;
const linkButton = (theme) => `
    color: ${theme.colors.text.uiControl};
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.heading}px;
    text-decoration: underline;
    text-decoration-color: ${theme.colors.text.uiControl};
`;

const variants = {
  body: body,
  label: label,
  heading: heading,
  intro: intro,
  "sub-heading": subHeading,
  "guiding-button": guidingButton,
  "guiding-button-sub": guidingButtonSub,
  "executive-button": executiveButton,
  "destructive-button": destructiveButton,
  "link-button": linkButton,
  "ui-control": uiControl,
  "input-value": inputValue,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
  variant: "body",
};
