// react
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    ...Platform.select({
      web: {
        cursor: "normal",
      },
    }),
  },
});
