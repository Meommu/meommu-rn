// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",

    paddingHorizontal: 20,
  },

  input: {
    width: "100%",
    height: 160,

    backgroundColor: color.bg400,

    borderRadius: 6,

    color: color.bg200,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,

    padding: 15,
  },
});
