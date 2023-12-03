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

  /**
   * 헤더
   */
  header: {
    padding: 12,
  },

  /**
   * 본문
   */
  body: {
    paddingHorizontal: 20,
    paddingVertical: 33,
    gap: 16,
  },

  bodyTitleLayout: {
    flexDirection: "row",
    gap: 26,
  },

  bodyTitle: {
    width: "100%",
    flexShrink: 1,
    color: color.g900,
    fontSize: 26,
    fontFamily: "yeonTheLand",
  },

  bodyContent: {
    color: "#626154",
    fontSize: 17,
    fontFamily: "yeonTheLand",
  },

  bodyDate: {
    color: "#8F8F8F",
    fontSize: 14,

    fontFamily: "Pretendard-Regular",
  },

  /**
   * 하단 버튼
   */
  bottomButtonWrapper: {
    padding: 20,
  },

  /**
   * 바텀 시트
   */
  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
