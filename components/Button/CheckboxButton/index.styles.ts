// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",

    position: "relative",
  },

  circle: {
    position: "absolute",
  },

  check: {
    position: "absolute",
    zIndex: 1,
  },
});
