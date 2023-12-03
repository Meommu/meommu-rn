// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },

  bannerImageWrapper: {
    width: "100%",
    maxWidth: size.MOBILE_WIDTH,
    aspectRatio: "1/1",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
  },
});
