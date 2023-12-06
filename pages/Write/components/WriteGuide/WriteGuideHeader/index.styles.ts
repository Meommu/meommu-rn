// react
import { StyleSheet } from "react-native";

// constants
import { size, font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    gap: 4,

    paddingBottom: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
  },

  title: {
    color: color.w,
    fontSize: 20,
    fontFamily: font.PretendardSemiBold,
  },

  subTitle: {
    fontSize: 14,
    fontFamily: font.PretendardRegular,
    color: color.bg200,
  },
});
