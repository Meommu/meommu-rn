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

  stopButton: {
    width: 140,

    position: "absolute",
    top: -(14 + 40),

    marginHorizontal: "auto",
    paddingVertical: 10,

    backgroundColor: "white",

    borderRadius: 6,
    borderColor: "#D0D0D0",
    borderWidth: 2,

    gap: 7,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
