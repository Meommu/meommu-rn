// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.w,
  },

  /**
   * 제목 본문 폼
   */
  writeForm: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },

  writeFormTitleInputWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  writeFormTitleInput: {
    paddingBottom: 7,

    borderBottomWidth: 2,

    color: color.g500,
    borderColor: color.g200,
  },

  writeFormContentInputWrapper: {
    width: "100%",
    height: "100%",
    flexShrink: 1,

    padding: 20,
    paddingBottom: 10,
  },

  writeFormContentInput: {
    width: "100%",
    height: "100%",

    fontSize: 16,
    fontFamily: font.YeonTheLand,
    color: color.g500,
    textAlign: "center",
    lineHeight: 22,
  },
});
