// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingBottom: size.NAVIGATION_BUTTON_HEIGHT + 40,
    backgroundColor: "#F5F6F8",
  },

  /**
   * 이미지 업로더
   */
  imageUploader: {
    width: "100%",
    padding: 7,
    flexDirection: "row",
  },

  imageUploaderItemLayout: {
    width: "20%",
    aspectRatio: "1/1",
    padding: 7,
  },

  imageUploaderItem: {
    borderWidth: 2,
    borderColor: "#BFC4CE",
    borderRadius: 4,
    width: "100%",
    height: "100%",
  },

  imageUploadButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  imageUploadButtonText: {
    fontSize: 12,
    fontFamily: "Pretendard-Regular",
    color: "#BFC4CE",
  },

  imageUploadedItem: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  imageUploadedItemImage: {
    position: "absolute",
  },

  imageUploadedItemRemoveButton: {
    position: "absolute",
    right: -10,
    top: -10,
  },

  imageUploaderEmptyItem: {
    width: "100%",
    height: "100%",
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
    fontSize: 20,
    paddingBottom: 7,
  },

  writeFormContentInputWrapper: {
    padding: 20,
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },

  writeFormContentInput: {
    width: "100%",
    height: "100%",
    fontSize: 16,
    fontFamily: "yeonTheLand",
    textAlign: "center",
    color: "#606077",
  },
});
