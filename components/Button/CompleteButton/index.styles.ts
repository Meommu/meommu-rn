// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: color.g400,
    fontFamily: font.PretendardSemiBold,
    fontSize: 16,
  },
});
