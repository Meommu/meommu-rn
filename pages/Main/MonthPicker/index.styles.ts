// react
import { StyleSheet } from "react-native";

// constants
import { color, font, zIndex } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 21,

    backgroundColor: color.g200,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dateText: {
    color: color.g500,
    fontSize: 18,
    fontFamily: font.YeonTheLand,
    lineHeight: 24,
  },

  /**
   * bottom sheet
   */
  bottomSheetBackdrop: {
    width: "100%",

    zIndex: zIndex.bottomSheetBackdrop,
  },

  bottomSheetContainer: {
    marginHorizontal: "auto",

    zIndex: zIndex.bottomSheetContainer,
  },

  handleIndicator: {
    width: "10%",

    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
});
