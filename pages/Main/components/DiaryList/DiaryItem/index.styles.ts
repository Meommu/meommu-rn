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

  diaryBodyWrapper: {
    alignItems: "flex-start",
    gap: 6,

    borderRadius: 6,

    overflow: "hidden",
  },

  diaryBody: {
    width: "100%",
  },

  diaryBodyTitle: {
    color: color.b,
    fontSize: 26,
    fontFamily: font.YeonTheLand,
  },

  diaryBodyContent: {
    color: color.g500,
    fontSize: 16,
    fontFamily: font.YeonTheLand,
  },

  diaryBodyInfo: {
    color: color.g400,
    fontSize: 14,
    fontFamily: font.YeonTheLand,
  },
});
