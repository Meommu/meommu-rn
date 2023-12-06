// react
import { StyleSheet } from "react-native";

// constants
import { zIndex } from "@/constants";

export const styles = StyleSheet.create({
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
