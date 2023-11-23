// react
import { StyleSheet } from "react-native";

// constants
import { color, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingBottom: size.NAVIGATION_BUTTON_HEIGHT + 40,
  },

  contentWrapper: {
    width: "100%",
    height: "100%",
    padding: 20,
  },

  content: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: color.formElementBg,
    alignItems: "center",
    paddingVertical: 55,
    gap: 39,
  },

  dogImageBox: {
    width: 169,
    height: 169,
    borderRadius: 60,
    backgroundColor: "white",
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
