// react
import { StyleSheet } from "react-native";

// constants
import { color, font, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",

    backgroundColor: color.w,
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
    gap: 10,
    paddingHorizontal: 20,
  },

  navigationLayout: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,

    paddingHorizontal: 20,
  },

  navigationButton: {
    height: size.NAVIGATION_BUTTON_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  navigationButtonText: {
    fontSize: 16,
    color: color.g300,
    fontFamily: font.PretendardSemiBold,
  },

  splitBar: {
    borderLeftColor: color.g300,
    borderLeftWidth: 1,
    height: 12,
  },

  bottomButton: {
    paddingTop: 0,
  },
});
