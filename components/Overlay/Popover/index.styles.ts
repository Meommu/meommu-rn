// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 0,
    alignItems: "center",

    position: "absolute",
    bottom: 0,
  },

  content: {
    position: "absolute",
    bottom: 0,

    paddingHorizontal: 22,
    paddingVertical: 6,

    alignItems: "center",

    borderRadius: 8,

    backgroundColor: color.g200,
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
