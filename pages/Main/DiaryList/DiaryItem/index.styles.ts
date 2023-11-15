// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    gap: 16,
  },

  imageSwiperWrapper: {
    width: "100%",
    aspectRatio: "1/1",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",
  },

  menu: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  order: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(13, 61, 70, 0.8)",
    borderRadius: 400,
    paddingHorizontal: 11,
    paddingTop: 1,
    paddingBottom: 3,
  },

  orderText: {
    fontSize: 14,
    color: "white",
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
