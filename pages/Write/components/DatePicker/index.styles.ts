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
    height: size.DATE_PICKER_CALENDAR_HEIGHT,
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

  yearPickerItemLayout: {
    width: "25%",
    height: size.DATE_PICKER_CALENDAR_HEIGHT / 3,
  },

  yearPickerItem: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  yearPickerItemButtonLayout: {
    height: "80%",
    aspectRatio: "1/1",

    borderRadius: 9999,
  },

  yearPickerItemButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  yearPickerItemButtonText: {
    color: color.g500,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },
});
