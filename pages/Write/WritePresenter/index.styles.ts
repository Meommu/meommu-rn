// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.w,
  },

  /**
   * 헤더
   */
  header: {
    padding: 12,
  },

  /**
   * 글 작성 완료 버튼
   */
  completeButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  completeButtonText: {
    color: color.g400,
    fontFamily: font.PretendardSemiBold,
    fontSize: 16,
  },

  /**
   * 하단 버튼
   */
  bottomButtonWrapper: {
    padding: 20,
    paddingTop: 0,
  },
});
