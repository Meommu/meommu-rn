// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.MONTH_CALENDAR_HEIGHT,
  },

  yearView: { position: "absolute", width: "100%", top: 10 },

  yearText: {
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
    color: "#4A5660",
  },

  chooseMonthButton: {
    padding: 20,
  },
});
