// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,

    borderRadius: 6,

    overflow: "hidden",
  },

  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: color.g400,
    fontFamily: font.PretendardSemiBold,
    fontSize: 16,
  },
});
