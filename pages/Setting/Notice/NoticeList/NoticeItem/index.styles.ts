// react
import { StyleSheet } from "react-native";

// constants
import { font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  toggler: {
    width: "100%",

    paddingVertical: 8,
    paddingHorizontal: 12,

    backgroundColor: color.g200,
  },

  buttonWrapper: {
    width: "100%",

    borderRadius: 6,

    overflow: "hidden",
  },

  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: 4,
    paddingHorizontal: 8,
  },

  buttonText: {
    justifyContent: "center",
    alignItems: "center",

    color: color.g700,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },

  content: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  contentText: {
    color: "#8B8B99",
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    lineHeight: 32,
  },
});
