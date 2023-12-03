// react
import { StyleSheet } from "react-native";

// constants
import { size, font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 6,
  },

  buttonText: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
