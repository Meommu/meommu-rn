import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexShrink: 1,
  },

  GuideText: {
    gap: 10,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
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

  fieldLayout: {
    gap: 18,
    paddingHorizontal: 20,
    width: "100%",
  },

  fieldView: {
    gap: 12,
  },

  fieldTextLayoutView: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  fieldGuideText: {
    fontSize: 14,
    fontFamily: "Pretendard-SemiBold",
  },
});
