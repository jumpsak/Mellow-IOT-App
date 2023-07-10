import { DefaultTheme } from "react-native-paper";

// const fontConfig = {
//   fontFamily: 'THSarabunNew'
// };

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#600EE6",
    secondary: "#414757",
    error: "#f13a59",
  },
  // fonts: configureFonts({config: fontConfig}),
};
