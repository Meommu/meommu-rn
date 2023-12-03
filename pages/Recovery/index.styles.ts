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
   * header
   */
  headerLayout: {
    padding: 12,
  },

  /**
   * swiper
   */
  swiper: {
    /**
     * ※ width 값을 고정시키면 슬라이더가 동작하지 않음
     */
    height: "100%",
  },

  slideLayout: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
  },

  guideText: {
    fontSize: 25,
    fontFamily: font.PretendardSemiBold,

    padding: 20,
  },

  input: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  inputContent: {
    borderColor: color.g300,
    borderWidth: 2,
    borderRadius: 4,

    height: 48,

    backgroundColor: color.g100,

    paddingHorizontal: 12,
    paddingVertical: 15,

    color: color.g800,
    fontFamily: font.PretendardSemiBold,
    fontSize: 16,
  },
});
