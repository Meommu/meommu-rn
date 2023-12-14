// react
import StyleSheet from "react-native-media-query";

// constants
import { color } from "@/constants";

export const { ids, styles } = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    "@media (min-width: 1024px)": {
      width: "auto",
      maxWidth: "100%",
      aspectRatio: "9 / 16",

      marginLeft: "auto",
      marginRight: "auto",

      overflow: "hidden",
    },
  },

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
