// react
import { StyleSheet } from "react-native";

// constants
import { zIndex, size } from "@/constants";

export const styles = StyleSheet.create({
  bottomSheetBackdrop: {
    width: "100%",
    zIndex: zIndex.bottomSheetBackdrop,
  },

  bottomSheetContainer: {
    marginHorizontal: "auto",
    zIndex: zIndex.bottomSheetContainer,
  },

  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  handleIndicator: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    width: "10%",
  },

  deleteDiaryButton: {
    height: size.NAVIGATION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteDiaryButtonText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
  },
});
