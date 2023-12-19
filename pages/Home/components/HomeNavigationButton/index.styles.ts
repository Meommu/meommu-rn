// react
import { StyleSheet } from "react-native";

// constants
import { size, color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.NAVIGATION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    padding: 10,
  },

  buttonText: {
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
