// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    position: "relative",

    backgroundColor: color.w,
  },

  header: {
    padding: 12,
  },

  content: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },

  profileCardLayout: {
    paddingHorizontal: 20,
  },

  navigationButtonLayout: {
    width: "100%",
    paddingTop: 27,
  },

  navigationButton: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navigationButtonText: {
    fontFamily: font.PretendardRegular,
    fontSize: 16,
    color: color.g400,
  },

  signLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",

    padding: 20,
  },

  splitBar: {
    borderLeftWidth: 1,
    borderColor: color.g300,
    height: 12,
  },
});
