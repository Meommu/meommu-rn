// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",

    borderRadius: 6,

    overflow: "hidden",
  },

  button: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  buttonText: {
    fontFamily: font.PretendardRegular,
    fontSize: 16,
    color: color.g400,
  },
});
