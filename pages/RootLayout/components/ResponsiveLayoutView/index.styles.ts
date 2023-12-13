// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  notch: {
    width: "100%",
    backgroundColor: color.w,
  },

  content: {
    position: "relative",

    width: "100%",
    height: "100%",
    flexShrink: 1,
  },
});
