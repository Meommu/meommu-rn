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

  modalLayout: {
    position: "absolute",
    bottom: 100,
  },

  modal: {
    borderRadius: 10,

    backgroundColor: "#626262",

    opacity: 0.9,
  },

  modalMessage: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    lineHeight: 25,

    paddingVertical: 7,
    paddingHorizontal: 14,
  },
});
