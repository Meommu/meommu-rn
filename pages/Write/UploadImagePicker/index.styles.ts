// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  imageUploader: {
    width: "100%",
    flexDirection: "row",

    padding: 7,
  },

  imageUploaderItemLayout: {
    width: "20%",
    aspectRatio: "1/1",

    padding: 7,
  },

  imageUploaderItem: {
    width: "100%",
    height: "100%",

    borderWidth: 2,
    borderColor: color.g300,
    borderRadius: 4,
  },

  imageUploadButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  imageUploadButtonText: {
    color: color.g300,
    fontSize: 12,
    fontFamily: font.PretendardRegular,
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
});
