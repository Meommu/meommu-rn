// react
import { StyleSheet } from "react-native";

// constants
import { size, font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,

    borderRadius: 6,

    overflow: "hidden",

    position: "relative",
  },

  content: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  dimmed: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    pointerEvents: "none",

    backgroundColor: color.g800,
  },

  buttonText: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
