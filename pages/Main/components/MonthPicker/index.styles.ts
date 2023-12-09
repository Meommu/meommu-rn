// react
import { StyleSheet } from "react-native";

// constants
import { size, color, font, zIndex } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",

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
  bottomSheetContainer: {
    marginHorizontal: "auto",

    zIndex: zIndex.bottomSheetContainer,
  },

  /**
   * swiper
   */
  monthCalendar: {
    height: size.CALENDAR_HEIGHT,
  },
});
