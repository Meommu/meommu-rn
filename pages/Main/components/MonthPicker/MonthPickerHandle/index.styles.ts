// react
import { StyleSheet } from "react-native";

// constants
import { font, color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  grabber: {
    width: 48,
    height: 4,

    marginTop: 10,

    backgroundColor: color.g300,

    borderRadius: 2.5,
  },

  header: {
    height: 40,

    paddingHorizontal: 20,
  },

  yearText: {
    color: color.g500,
    fontSize: 18,
    fontFamily: font.PretendardSemiBold,
    textAlign: "center",
  },

  guideText: {
    color: color.bg100,
    textAlign: "center",
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,
  },
});
