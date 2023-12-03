// react
import { StyleSheet } from "react-native";

// constants
import { color, font, size } from "@/constants";

export const styles = StyleSheet.create({
  bottomSheetFooter: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 26,

    backgroundColor: color.bg500,

    gap: 16,
  },

  bottomSheetFooterTitle: {
    fontSize: 14,
    fontFamily: font.PretendardRegular,
    color: color.bg300,
    textAlign: "center",
  },

  bottomSheetFooterButtonWrapper: {
    flexDirection: "row",
    gap: 12,
  },

  bottomSheetFooterPrevButton: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: color.g800,

    borderRadius: 6,
  },

  bottomSheetFooterPrevButtonText: {
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
