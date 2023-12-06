// react
import { StyleSheet } from "react-native";

// constants
import { font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  title: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 12,
    paddingHorizontal: 21,

    backgroundColor: "#ECECF2",
  },

  titleText: {
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
