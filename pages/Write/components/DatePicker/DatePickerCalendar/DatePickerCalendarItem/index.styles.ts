// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  calenderItemLayout: {
    width: "14%",
    height: "14%",
    justifyContent: "center",
    alignItems: "center",

    padding: 6,
  },

  /**
   * `요일(Day)`
   */
  calendarItemHeaderText: {
    textAlign: "center",
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
  },

  /**
   * `일(Date)`
   */
  calendarItemDataLayout: {
    height: "100%",
    aspectRatio: "1/1",

    borderRadius: 9999,

    overflow: "hidden",
  },

  calendarItemData: {
    position: "relative",

    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  calendarItemDataInnerLayout: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  calendarItemDataText: {
    color: color.g500,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
  },

  calendarItemDataSelectedCircle: {
    width: "100%",
    height: "100%",

    borderColor: color.b,
    borderRadius: 9999,
  },
});
