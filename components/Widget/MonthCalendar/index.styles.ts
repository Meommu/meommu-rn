// react
import { StyleSheet } from "react-native";

// constants
import { size, font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.MONTH_CALENDAR_HEIGHT,
  },

  header: {
    height: 40,

    paddingHorizontal: 20,
  },

  yearText: {
    fontSize: 18,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
    color: color.g500,
  },

  swiperController: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
