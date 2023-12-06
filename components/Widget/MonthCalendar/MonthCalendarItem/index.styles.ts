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

    padding: 5,
  },

  monthElementCircle: {
    height: "100%",
    aspectRatio: "1/1",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 999,
    borderWidth: 1,

    overflow: "hidden",

    position: "relative",
  },

  monthElementCircleImage: {
    width: "100%",
    height: "100%",

    position: "absolute",
  },

  monthElementText: {
    fontSize: 16,
    fontFamily: font.PretendardRegular,
    color: color.g500,
  },
});
