// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

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
});
