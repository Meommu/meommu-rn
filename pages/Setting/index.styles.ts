// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

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

  settingList: {
    width: "100%",
    paddingTop: 27,
  },

  signLayout: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",

    padding: 20,
  },

  splitBar: {
    borderLeftWidth: 2,
    borderColor: color.g300,
    height: 12,
  },
});
