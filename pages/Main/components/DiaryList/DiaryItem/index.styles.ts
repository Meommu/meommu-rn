// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    gap: 16,

    paddingBottom: 30,
  },

  imageSliderWrapper: {
    width: "100%",

    position: "relative",
  },

  menu: {
    position: "absolute",
    top: 4,
    right: 4,
  },

  diaryBody: {
    alignItems: "flex-start",
    gap: 6,
  },

  diaryTitle: {
    color: color.b,
    fontSize: 26,
    fontFamily: font.YeonTheLand,
  },

  diaryContent: {
    color: color.g500,
    fontSize: 16,
    fontFamily: font.YeonTheLand,
  },

  diaryInfo: {
    color: color.g400,
    fontSize: 14,
    fontFamily: font.YeonTheLand,
  },
});
