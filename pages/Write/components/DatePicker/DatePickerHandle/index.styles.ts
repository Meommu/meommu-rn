// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  grabber: {
    width: 48,
    height: 4,

    marginTop: 10,

    backgroundColor: color.g300,

    borderRadius: 2.5,
  },

  toggler: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,

    marginVertical: 14,
  },

  togglerText: {
    color: color.g500,
    fontSize: 18,
    fontFamily: font.PretendardSemiBold,
  },
});
