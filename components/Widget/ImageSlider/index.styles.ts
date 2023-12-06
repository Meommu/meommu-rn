// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",

    position: "relative",

    overflow: "hidden",
  },

  order: {
    position: "absolute",
    bottom: 10,
    right: 10,

    backgroundColor: color.bg400,

    borderRadius: 400,

    paddingVertical: 3,
    paddingHorizontal: 11,
  },

  orderText: {
    color: color.w,
    fontSize: 14,
    fontFamily: font.PretendardRegular,
    letterSpacing: 1.4,
  },
});
