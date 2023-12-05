// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: "100%",
    height: "100%",
    alignItems: "center",

    pointerEvents: "none",
  },

  contentLayout: {
    position: "absolute",
    bottom: 100,
  },

  contentBody: {
    backgroundColor: color.g400,
    borderRadius: 10,
  },

  message: {
    color: color.w,
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    lineHeight: 22,

    padding: 10,
  },
});
