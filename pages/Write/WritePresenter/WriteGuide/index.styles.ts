// react
import { StyleSheet } from "react-native";

// constants
import { zIndex } from "@/constants";

export const styles = StyleSheet.create({
  /**
   * bottom sheet
   */
  bottomSheetContainer: {
    marginHorizontal: "auto",
    zIndex: zIndex.bottomSheetContainer,
  },

  bottomSheetBackground: {
    backgroundColor: "#1B1E26",
  },

  bottomSheetIndicator: {
    backgroundColor: "rgba(235, 235, 245, 0.3)",
    width: "15%",
  },

  bottomSheetContent: {
    height: "100%",
  },

  /**
   * bottom sheet footer
   */
  bottomSheetFooter: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 26,
    backgroundColor: "#1B1E26",
    gap: 16,
  },

  bottomSheetFooterTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#43464E",
    textAlign: "center",
  },

  bottomSheetFooterButtonWrapper: {
    flexDirection: "row",
    gap: 12,
  },

  /**
   * swiper
   */
  swiperContainer: {
    height: "100%",
  },
});
