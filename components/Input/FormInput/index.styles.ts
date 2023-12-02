// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  input: {
    width: "100%",

    flexShrink: 1,

    backgroundColor: color.g200,

    borderRadius: 4,

    fontSize: 16,
    fontFamily: font.PretendardSemiBold,

    paddingHorizontal: 13,
    paddingVertical: 10,
  },
});
