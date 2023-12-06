// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",

    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  controller: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    position: "absolute",
  },

  titleText: {
    fontSize: 20,
    color: color.g700,
    fontFamily: font.PretendardSemiBold,
  },
});
