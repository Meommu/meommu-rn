// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 8,

    backgroundColor: color.g200,

    alignItems: "center",

    paddingHorizontal: 22,
    paddingVertical: 6,

    position: "relative",
    zIndex: 1,
  },

  contentText: {
    color: color.g400,
    fontFamily: font.PretendardSemiBold,
    fontSize: 16,
    lineHeight: 32,
  },

  tabLayout: {
    position: "absolute",
    bottom: -10,
  },
});
