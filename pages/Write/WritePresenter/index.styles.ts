// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.w,
  },

  /**
   * 헤더
   */
  header: {
    padding: 12,
  },

  /**
   * footer
   */
  footer: {
    alignItems: "center",
  },
});
