// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",

    borderRadius: 4,

    overflow: "hidden",

    backgroundColor: color.g200,
  },

  border: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    pointerEvents: "none",
  },

  content: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  contentText: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
