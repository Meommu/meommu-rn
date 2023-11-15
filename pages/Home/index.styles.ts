// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  contentView: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  titleView: {
    position: "absolute",
    top: 45,
    gap: 5,
    zIndex: 1,
    width: "100%",
  },

  titleText: {
    fontSize: 60,
    textAlign: "center",
    fontFamily: "yeonTheLand",
  },

  subTitleText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    textAlign: "center",
  },

  navigationLayoutView: {
    flexDirection: "row",
    justifyContent: "center",
  },

  navigationText: {
    fontSize: 16,
    color: "#B7B7CB",
    fontFamily: "Pretendard-SemiBold",
  },

  splitBarView: {
    borderLeftColor: "#B7B7CB",
    borderLeftWidth: 2,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  signInFormView: {
    gap: 10,
    padding: 20,
  },
});
