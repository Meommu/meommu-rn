// react
import { StyleSheet } from "react-native";

// constants
import { size, zIndex } from "@/constants";

export const styles = StyleSheet.create({
  /**
   * bottom sheet
   */
  bottomSheetContainer: {
    marginHorizontal: "auto",

    zIndex: zIndex.bottomSheetContainer,
  },

  /**
   * swiper
   */
  monthCalendar: {
    height: size.MONTN_PICKER_CALENDAR_HEIGHT,
  },
});
