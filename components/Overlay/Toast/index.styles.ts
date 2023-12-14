// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: "100%",
    height: "100%",

    pointerEvents: "none",
  },

  content: {
    position: "relative",

    width: "100%",
    height: "100%",
    alignItems: "center",
  },

  modal: {
    position: "absolute",
    bottom: 100,

    backgroundColor: color.g400,

    borderRadius: 10,
  },

  modalMessage: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    lineHeight: 22,

    padding: 10,
  },
});
