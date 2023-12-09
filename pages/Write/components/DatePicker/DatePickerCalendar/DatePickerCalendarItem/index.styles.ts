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

  calendarItemHeaderText: {
    textAlign: "center",
    color: color.g300,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
  },

  calendarItemDataLayout: {
    position: "relative",

    height: "100%",
    aspectRatio: "1/1",
  },

  calenderItemData: {
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

  calenderItemDataImage: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    borderRadius: 9999,

    overflow: "hidden",
  },

  calendarItemDataSelectedCircle: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    borderWidth: 1,
    borderColor: color.b,
    borderRadius: 9999,
  },
});
