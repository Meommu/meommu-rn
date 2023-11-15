// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.MONTH_CALENDAR_HEIGHT,
  },

  header: {
    paddingHorizontal: 20,
    height: 40,
  },

  yearText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
    color: "#4A5660",
  },

  swiperController: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  chooseMonthButton: {
    padding: 20,
  },
});
