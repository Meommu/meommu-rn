// react
import { StyleSheet } from "react-native";

// constants
import { size, color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contentText: {
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
