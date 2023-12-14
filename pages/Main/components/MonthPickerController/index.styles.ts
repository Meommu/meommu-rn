// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",

    paddingVertical: 6,
    paddingHorizontal: 17,

    backgroundColor: color.g200,
  },

  content: {
    borderRadius: 6,

    overflow: "hidden",
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    padding: 4,
  },

  buttonText: {
    color: color.g500,
    fontSize: 18,
    fontFamily: font.YeonTheLand,
    lineHeight: 24,
  },
});
