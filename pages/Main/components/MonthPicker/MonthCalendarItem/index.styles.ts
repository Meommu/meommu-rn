// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",

    paddingHorizontal: 20,
  },

  monthElementLayout: {
    width: "25%",
    height: "33%",
  },

  monthElement: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    padding: 7,
  },

  monthElementButton: {
    height: "80%",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",

    position: "relative",
  },

  monthElementButtonCircleLayout: {
    position: "absolute",
    top: 0,
    left: 0,

    width: "100%",
    height: "100%",

    borderRadius: 9999,

    overflow: "hidden",
  },

  monthElementButtonText: {
    fontSize: 18,
    fontFamily: font.PretendardRegular,
    color: color.g700,
  },
});
