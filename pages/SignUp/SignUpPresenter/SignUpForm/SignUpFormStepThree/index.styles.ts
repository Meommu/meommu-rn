// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },

  /**
   * 인삿말
   */
  greeting: {
    gap: 10,

    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },

  greetingTitle: {
    fontSize: 25,
    fontFamily: font.PretendardSemiBold,
    color: color.g800,
  },

  greetingSubTitle: {
    fontSize: 14,
    fontFamily: font.PretendardSemiBold,
    color: color.g400,
  },
});
