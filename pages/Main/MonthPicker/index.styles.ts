// react
import { StyleSheet } from "react-native";

// constants
import { zIndex } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 21,
    backgroundColor: "#ECECF2",
    alignItems: "flex-start",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  dateText: {
    fontSize: 18,
    fontFamily: "yeonTheLand",
    color: "#89899C",
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
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "10%",
  },
});
