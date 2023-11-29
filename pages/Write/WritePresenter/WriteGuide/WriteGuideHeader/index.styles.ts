// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    height: size.AI_BOTTOM_SHEET_HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
    gap: 4,
  },

  title: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "white",
  },

  subTitle: {
    fontSize: 14,
    fontFamily: "Pretendard-Regular",
    color: "#6F7682",
  },
});
