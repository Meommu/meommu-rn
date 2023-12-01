// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

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

  sign: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    padding: 20,
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
  },
});
