// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
    position: "relative",
  },

  order: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(13, 61, 70, 0.8)",
    borderRadius: 400,
    paddingHorizontal: 11,
    paddingTop: 1,
    paddingBottom: 3,
  },

  orderText: {
    fontSize: 14,
    color: "white",
  },
});
