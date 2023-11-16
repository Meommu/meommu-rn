// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    gap: 16,
  },

  imageSliderWrapper: {
    width: "100%",
    position: "relative",
  },

  menu: {
    position: "absolute",
    top: 0,
    right: 0,
  },

  diaryBody: {
    alignItems: "flex-start",
    gap: 6,
  },

  diaryTitle: {
    color: "black",
    fontSize: 26,
    fontFamily: "yeonTheLand",
  },

  diaryContent: {
    fontSize: 16,
    fontFamily: "yeonTheLand",
    color: "#626154",
  },

  diaryInfo: {
    color: "#8F8F8F",
    fontSize: 14,
    fontFamily: "yeonTheLand",
  },
});
