// react
import { StyleSheet } from "react-native";

// constants
import { size, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",

    position: "relative",
  },

  stopButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 7,

    position: "absolute",
    bottom: size.BOTTOM_SHEET_INDICATOR_HEIGHT + 14,

    paddingVertical: 4,
    paddingHorizontal: 19,

    backgroundColor: "white",

    borderRadius: 6,
    borderColor: "#D0D0D0",
    borderWidth: 2,
  },

  stopButtonText: {
    color: "#B0B0B0",
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
    lineHeight: 32,
  },

  grabber: {
    width: 48,
    height: 4,

    backgroundColor: "rgba(235, 235, 245, 0.3)",

    borderRadius: 2.5,
  },
});
