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

  bottomSheetContent: {
    height: "100%",
  },

  /**
   * swiper
   */
  swiperContainer: {
    height: "100%",
  },
});
