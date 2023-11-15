// react
import { StyleSheet } from "react-native";

// constants
import { zIndex, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  listCountText: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 60,
    fontSize: 14,
    color: "#7D8899",
    fontFamily: "Pretendard-SemiBold",
  },

  bottomSheetBackdrop: {
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
