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

  headerTitle: {
    fontSize: 30,
    fontFamily: "yeonTheLand",
  },

  /**
   * 본문
   */
  captureArea: {
    backgroundColor: "white",
  },

  body: {
    paddingHorizontal: 20,
    paddingVertical: 33,
    gap: 16,
  },

  bodyTitle: {
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
   * 캡처된 화면 모달
   */
  modal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  modalDimmed: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  modalClosebutton: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
