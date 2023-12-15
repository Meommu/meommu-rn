// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    backgroundColor: color.w,

    position: "relative",
  },

  /**
   * 로고, 캡션
   */
  brandContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 29,
    paddingBottom: 16,
  },

  logo: {
    fontSize: 60,
    fontFamily: font.YeonTheLand,
    textAlign: "center",
  },

  caption: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: -0.3,
  },

  /**
   * 로그인 폼
   */

  signInForm: {
    position: "absolute",
    bottom: 0,

    width: "100%",
  },

  signInFormInputs: {
    gap: 10,
    paddingHorizontal: 20,
  },

  navigationLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 20,
  },

  splitBar: {
    borderLeftColor: color.g300,
    borderLeftWidth: 2,
    height: 12,
  },

  bottomButton: {
    paddingTop: 0,
  },
});
