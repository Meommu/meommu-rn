// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    justifyContent: "center",
    alignItems: "center",
  },

  GuideText: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,

    position: "absolute",
    top: 0,
    left: 0,
  },

  GreetingText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
  },

  IntroductionText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
    color: "#B7B7CB",
  },
});
