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

  headerTitle: {
    fontSize: 30,
    fontFamily: font.YeonTheLand,
  },

  /**
   * 본문
   */
  captureArea: {
    backgroundColor: color.w,
  },

  body: {
    gap: 16,

    paddingHorizontal: 20,
    paddingVertical: 33,
  },

  bodyTitle: {
    color: color.g900,
    fontSize: 26,
    fontFamily: font.YeonTheLand,
    lineHeight: 26,
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
   * 캡처된 화면 모달
   */
  modal: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",

    padding: 15,
  },

  modalDimmed: {
    width: "100%",
    height: "100%",

    position: "absolute",

    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalClosebutton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
