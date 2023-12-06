// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  placeholderImage: {
    width: 160,
    height: 160,
  },

  placeholderText: {
    color: color.g400,
    fontFamily: font.YeonTheLand,
    fontSize: 20,
  },
});
