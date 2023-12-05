// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  list: {
    flexDirection: "row",

    padding: 7,
  },

  item: {
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
