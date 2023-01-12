import { fontFamily } from "../fonts";

export const theme = {
  fonts: {
    body: fontFamily.regular,
    heading: fontFamily.bold,
    subHeading: fontFamily.bold,
    executiveButton: fontFamily.bold,
    guidingButton: fontFamily.regular,
    destructiveButton: fontFamily.regular,
    uiControl: fontFamily.medium,
  },
  fontSizes: {
    heading: 22,
    subHeading: 17,
    captions: 15,
    button: 22,
    subButton: 17,
    body: 12,
    inputField: 14,
    intro: 16,
  },
  colors: {
    background: "#232323",
    border: "#898989",
    overlay: "#232323",
    text: {
      body: "#898989",
      heading: "#FFFFFF",
      subHeading: "#898989",
      executiveButton: "#232323",
      guidingButton: "#FFFFFF",
      destructiveButton: "#666666",
      uiControl: "#FFFFFF",
      intro: "#FFFFFF",
      inputField: "#000000",
    },
    buttons: {
      executive: "#8ECD52",
      guiding: "transparent",
      destructive: "transparent",
      option: "transparent",
      nav: "#FFFFFF",
    },
    tabs: {
      active: "#585858",
      inactive: "#2d2e32",
    },
  },
  sizes: {
    footerMinHeight: 100,
  },
  roundness: 10,
  screenHorizontalOffset: 24,
  headingAlign: "center",
};
