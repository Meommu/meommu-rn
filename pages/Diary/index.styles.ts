// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",

    position: "relative",

    backgroundColor: color.w,
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
    gap: 16,

    paddingHorizontal: 20,
    paddingVertical: 33,
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
    fontFamily: font.YeonTheLand,
  },

  bodyContent: {
    color: color.g500,
    fontSize: 17,
    fontFamily: font.YeonTheLand,
    lineHeight: 22,
  },

  bodyDate: {
    color: color.g300,
    fontSize: 14,
    fontFamily: font.PretendardRegular,
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
    paddingTop: 0,
    gap: 6,
  },
});
