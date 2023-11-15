// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },

  content: {
    width: "100%",
    height: "100%",
    position: "relative",
  },

  header: {
    padding: 12,
  },

  profile: {
    paddingHorizontal: 20,
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
