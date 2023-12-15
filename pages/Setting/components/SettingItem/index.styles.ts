// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
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
