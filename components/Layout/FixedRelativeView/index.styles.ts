// react
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      web: {
        transform: "rotate(0)",
      },
    }),
  },
});
