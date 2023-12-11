// react
import { StyleSheet } from "react-native";

// constants
import { color, size, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    backgroundColor: color.w,
  },

  /**
   * header
   */
  header: {
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 12,
  },

  logoText: {
    fontSize: 30,
    fontFamily: font.YeonTheLand,
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
  },

  scrollGradient: {
    position: "absolute",
    top: "-50%",

    width: "100%",
    height: "150%",
  },
});
