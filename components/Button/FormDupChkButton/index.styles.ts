// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 4,

    overflow: "hidden",

    backgroundColor: color.g200,
  },

  button: {
    position: "relative",
  },

  buttonBorder: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",
  },

  buttonContent: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },

  buttonContentText: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
