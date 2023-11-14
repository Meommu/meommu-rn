// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
  },

  formBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: color.formElementBg,
    alignItems: "center",
    gap: 39,
    paddingVertical: 55,
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
});
