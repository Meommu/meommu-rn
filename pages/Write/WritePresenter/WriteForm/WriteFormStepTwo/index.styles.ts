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

  imagePickerLayout: {
    alignItems: "flex-start",

    paddingVertical: 10,
    paddingHorizontal: 21,

    backgroundColor: color.g200,
  },

  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  imagePickerText: {
    color: color.g500,
    fontSize: 18,
    fontFamily: font.YeonTheLand,
    lineHeight: 24,
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
