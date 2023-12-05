// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },

  contentWrapper: {
    width: "100%",
    height: "100%",

    padding: 20,
    paddingBottom: 10,
  },

  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    gap: 39,

    borderRadius: 8,

    backgroundColor: color.g200,

    paddingVertical: 55,
  },

  dogImageBox: {
    width: 169,
    height: 169,

    borderRadius: 60,

    backgroundColor: color.w,
  },

  dogImage: {
    width: "100%",
    height: "100%",
  },

  dogNameInputWrapper: {
    width: 169,
  },

  nextButtonWrapper: {
    padding: 20,
  },
});
