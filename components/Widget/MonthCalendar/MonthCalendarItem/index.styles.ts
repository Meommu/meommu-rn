// react
import { StyleSheet } from "react-native";

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
    justifyContent: "center",
    alignItems: "center",

    padding: 5,
  },

  monthElementCircle: {
    height: "100%",
    aspectRatio: "1/1",

    justifyContent: "center",
    alignItems: "center",

    borderRadius: 999,
    borderWidth: 1,

    overflow: "hidden",

    position: "relative",
  },

  monthElementCircleImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  monthElementText: {
    fontSize: 16,
    fontFamily: "Pretendard-Regular",
    color: "#4A5660",
  },
});
