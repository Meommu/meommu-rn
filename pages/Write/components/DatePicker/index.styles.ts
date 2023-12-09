// react
import { StyleSheet } from "react-native";

// constants
import { zIndex, size, color, font } from "@/constants";

export const styles = StyleSheet.create({
  bottomSheetContainer: {
    zIndex: zIndex.bottomSheetContainer,

    marginHorizontal: "auto",
  },

  contentLayout: {
    position: "relative",

    width: "100%",
    height: size.CALENDAR_HEIGHT,
  },

  content: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",
  },

  yearPicker: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  yearPickerItem: {
    width: "25%",
    height: size.CALENDAR_HEIGHT / 3,
    alignItems: "center",
    justifyContent: "center",
  },

  yearPickerItemText: {
    color: color.g500,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },
});
