const fontFamily = {
  regular: "sf-regular",
  medium: "sf-medium",
  bold: "sf-bold",
  semiBold: "sf-bold",
};

const themeFonts = {
  [fontFamily.regular]: require("../../../assets/fonts/sf-pro-display/SFProDisplayRegular.ttf"),
  [fontFamily.medium]: require("../../../assets/fonts/sf-pro-display/SFProDisplayMedium.ttf"),
  [fontFamily.bold]: require("../../../assets/fonts/sf-pro-display/SFProDisplayBold.ttf"),
};

export { fontFamily, themeFonts };
