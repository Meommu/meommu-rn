// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  list: {
    width: "100%",
    flexDirection: "row",

    padding: 7,
  },

  itemLayout: {
    width: "20%",
    height: 0,

    paddingBottom: "20%",

    position: "relative",
  },

  item: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    padding: 7,
  },

  itemBorder: {
    width: "100%",
    height: "100%",

    borderWidth: 2,
    borderColor: color.g300,
    borderRadius: 4,

    position: "relative",
  },

  /**
   * 이미지 업로더
   */
  uploader: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    gap: 5,
  },

  uploaderText: {
    color: color.g300,
    fontSize: 12,
    fontFamily: font.PretendardRegular,
  },

  /**
   * 업로드 된 이미지
   */
  imageRemover: {
    position: "absolute",
    right: -10,
    top: -10,
  },
});
