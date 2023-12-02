// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  input: {
    width: "100%",

    borderBottomWidth: 1,
    borderColor: color.g400,

    fontFamily: font.YeonTheLand,
    fontSize: 20,
    color: color.g600,
    textAlign: "center",

    paddingBottom: 4,
  },
});
