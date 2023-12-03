// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: color.w,
  },

  content: {
    alignItems: "center",

    marginTop: 92,

    gap: 81,
  },

  guideLayout: {
    gap: 12,
  },

  guideTitleText: {
    color: color.g900,
    fontSize: 60,
    fontFamily: font.YeonTheLand,
  },

  guideContentText: {
    color: color.g400,
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },

  bottomButtonLayout: {
    width: "100%",
    padding: 20,
  },
});
