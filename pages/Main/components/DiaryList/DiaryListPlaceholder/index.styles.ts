// react
import { StyleSheet } from "react-native";

// constants
import { color, font, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,

    paddingBottom: 10 + 13 + size.NAVIGATION_BUTTON_HEIGHT + 40,
  },

  placeholderImage: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: color.g400,
    fontFamily: font.YeonTheLand,
    fontSize: 20,
  },
});
