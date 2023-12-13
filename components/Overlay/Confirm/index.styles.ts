// react
import { StyleSheet } from "react-native";

// constants
import { color, font, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",

    width: "100%",
    height: "100%",
  },

  content: {
    position: "relative",

    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  dimmed: {
    position: "absolute",

    width: "100%",
    height: "100%",

    backgroundColor: "rgba(0, 0, 0, 0.5)",

    pointerEvents: "auto",
  },

  modal: {
    width: "80%",
    maxWidth: size.MOBILE_WIDTH,

    borderRadius: 20,

    backgroundColor: color.bg500,

    padding: 16,

    pointerEvents: "auto",
  },

  titleText: {
    fontSize: 20,
    fontFamily: font.PretendardSemiBold,
    color: color.w,
    textAlign: "center",

    marginBottom: 12,
  },

  bodyText: {
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    color: color.bg200,
    textAlign: "center",
    lineHeight: 24,

    marginBottom: 24,
  },

  confirmInputWrapper: {
    width: "100%",
    flexDirection: "column",

    marginBottom: 12,
  },

  confirmInput: {
    width: "100%",

    backgroundColor: color.bg400,

    borderRadius: 6,

    padding: 14,

    color: color.bg200,
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },

  buttonWrapper: {
    flexDirection: "row",
    gap: 12,
  },

  okButton: {
    width: "60%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,

    borderRadius: 6,

    backgroundColor: color.g800,
  },

  okButtonText: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
    color: color.g300,
  },

  cancelButton: {
    width: "40%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,

    borderRadius: 6,

    backgroundColor: color.primary,
  },

  cancelButtonText: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
    color: color.w,
  },
});
