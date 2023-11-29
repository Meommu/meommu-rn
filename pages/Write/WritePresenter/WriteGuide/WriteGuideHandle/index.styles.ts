// react
import { StyleSheet } from "react-native";

// constants
import { size } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: size.BOTTOM_SHEET_INDICATOR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  stopButtonLayout: {
    position: "absolute",
    top: -(14 + 40),
    width: "100%",
    alignItems: "center",
    pointerEvents: "none",
  },

  stopButton: {
    pointerEvents: "auto",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "#D0D0D0",
    borderWidth: 2,
    flexDirection: "row",
    gap: 7,
  },

  stopButtonText: {
    color: "#B0B0B0",
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },

  grabber: {
    backgroundColor: "rgba(235, 235, 245, 0.3)",
    borderRadius: 2.5,
    width: 48,
    height: 4,
  },
});
