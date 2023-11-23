// react
import { StyleSheet } from "react-native";

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

  completeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    color: "#828282",
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },

  bottomButtonWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
  },
});
