// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.w,
  },

  headerLayout: {
    padding: 12,
  },

  footerLayout: {
    gap: 20,
    padding: 20,
  },

  input: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    paddingHorizontal: 20,
  },

  inputContent: {
    borderColor: color.g300,
    borderWidth: 2,
    borderRadius: 4,
    height: 48,
    backgroundColor: "#F5F6F8",
    paddingHorizontal: 12,
    paddingVertical: 15,
    color: color.g800,
    fontFamily: "Pretendard-SemiBold",
    fontSize: 16,
  },

  swiper: {
    /**
     * ※ width 값을 고정시키면 슬라이더가 동작하지 않음
     */
    height: "100%",
  },

  slideLayout: {
    width: "100%",
    height: "100%",
    position: "relative",
    justifyContent: "center",
    alignContent: "center",
  },

  guideText: {
    fontSize: 25,
    fontFamily: "Pretendard-SemiBold",
    position: "absolute",
    left: 20,
    top: 20,
    zIndex: 1,
  },
});
