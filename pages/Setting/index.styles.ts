// react
import { StyleSheet } from "react-native";

// constants
import { color, size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    position: "relative",
  },

  header: {
    padding: 12,
  },

  profileCardLayout: {
    paddingHorizontal: 20,
  },

  navigationButtonLayout: {
    width: "100%",
    paddingTop: 27,
  },

  navigationButton: {
    width: "100%",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  navigationButtonText: {
    fontFamily: "Pretendard-Regular",
    fontSize: 16,
    color: color.g400,
  },

  signLayout: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },

  sign: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
  },

  signButton: {
    width: "50%",
  },

  signButtonText: {
    color: "#ABB0BA",
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    textAlign: "center",
  },

  splitBar: {
    borderWidth: 1,
    borderColor: "#ABB0BA",
    height: 12,
  },
});
