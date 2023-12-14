// react
import { StyleSheet } from "react-native";

// constants
import { size, font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexShrink: 1,

    borderRadius: 6,

    overflow: "hidden",

    position: "relative",
  },

  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 7,
  },

  buttonText: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
