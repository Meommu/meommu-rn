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
  },

  guideText: {
    fontSize: 25,
    fontFamily: font.PretendardSemiBold,

    paddingHorizontal: 20,
    paddingTop: 52,
  },

  dotContainer: {
    margin: 0,
  },

  dot: {
    marginLeft: 3.75,
    marginRight: 3.75,
    width: 6,
    height: 6,
    /**
     * react-native-web-swiper 패키지의
     * minWidth 속성 default(8)값을 제거해주기 위함
     */
    minWidth: 0,
  },

  /**
   * bottom button
   */
  buttonView: {
    width: "100%",
    padding: 20,
    paddingTop: 6,
  },
});
