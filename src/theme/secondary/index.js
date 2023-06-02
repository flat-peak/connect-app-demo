import { fontFamily } from "../fonts";

export const theme = {
  roundness: 10,
  buttonRoundness: 0,
  fonts: {
    body: fontFamily.regular,
    heading: fontFamily.bold,
    subHeading: fontFamily.regular,
    executiveButton: fontFamily.regular,
    guidingButton: fontFamily.regular,
    destructiveButton: fontFamily.regular,
    uiControl: fontFamily.medium,
  },
  fontSizes: {
    heading: 25,
    subHeading: 17,
    captions: 15,
    button: 22,
    subButton: 17,
    body: 15,
    inputField: 14,
    intro: 16,
  },
  colors: {
    background: "#EDEDED",
    border: "#898989",
    overlay: "#232323",
    text: {
      body: "#000000",
      heading: "#000000",
      subHeading: "#000000",
      executiveButton: "#ffffff",
      guidingButton: "#000000",
      destructiveButton: "#666666",
      uiControl: "#000000",
      inputField: "#000000",
    },
    buttons: {
      executive: "#000000",
      guiding: "#cccccc",
      destructive: "transparent",
      option: "#F6F6F6",
      nav: "#000000",
    },
    tabs: {
      active: "#F6F6F6",
      inactive: "#EDEDED",
    },
  },
  sizes: {
    footerMinHeight: 200,
  },
  screenHorizontalOffset: 24,
  headingAlign: "left",
};
