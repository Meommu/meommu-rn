// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },

  /**
   * header
   */
  header: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 12,
  },

  logoText: {
    fontSize: 30,
    fontFamily: "yeonTheLand",
  },

  /**
   * controller
   */
  controllerBox: {
    flexDirection: "row",
  },

  /**
   * footer
   */
  footerWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },

  footer: {
    paddingTop: 0,
    backgroundColor: color.w,
  },

  popoverLayout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    top: -48,
  },
});
