// react
import { StyleSheet } from "react-native";

// constants
import { font } from "@/constants";

export const styles = StyleSheet.create({
  list: {
    width: "100%",
    gap: 10,

    paddingHorizontal: 20,
  },

  item: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",

    borderRadius: 6,
  },

  itemText: {
    fontSize: 16,
    fontFamily: font.PretendardSemiBold,

    paddingHorizontal: 16,
  },
});
