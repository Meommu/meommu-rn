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
    paddingBottom: 150,

    color: color.g300,
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },

  bottomSheetContent: {
    paddingTop: 0,
    gap: 6,
  },
});
