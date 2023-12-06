// react
import { StyleSheet } from "react-native";

// constants
import { color, zIndex } from "@/constants";

export const styles = StyleSheet.create({
  /**
   * bottom sheet
   */
  bottomSheetContainer: {
    marginHorizontal: "auto",
    zIndex: zIndex.bottomSheetContainer,
  },

  bottomSheetBackground: {
    backgroundColor: color.bg500,
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
