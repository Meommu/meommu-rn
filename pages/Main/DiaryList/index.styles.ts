// react
import { StyleSheet } from "react-native";

// constants
import { font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  listCountText: {
    paddingTop: 10,
    paddingBottom: 60,

    color: color.g300,
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },

  bottomSheetContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 6,
  },
});
