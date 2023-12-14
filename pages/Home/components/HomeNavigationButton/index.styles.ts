// react
import { StyleSheet } from "react-native";

// constants
import { size, color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.NAVIGATION_BUTTON_HEIGHT,

    borderRadius: 6,

    overflow: "hidden",
  },

  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    padding: 10,
  },

  buttonText: {
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
