// react
import { StyleSheet } from "react-native";

// constants
import { color, font, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  header: {
    width: "100%",
    height: 37,
    alignItems: "center",
    justifyContent: "center",
  },

  headerText: {
    fontSize: 14,
    fontFamily: font.PretendardRegular,
    color: color.bg300,
    textAlign: "center",
  },

  footer: {
    flexDirection: "row",
    gap: 12,

    paddingTop: 0,
    paddingHorizontal: 26,

    backgroundColor: color.bg500,
  },

  prevButton: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: color.g800,

    borderRadius: 6,
  },

  prevButtonText: {
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
