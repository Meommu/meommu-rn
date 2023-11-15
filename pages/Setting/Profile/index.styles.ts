// react
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    position: "relative",
    overflow: "hidden",
  },

  profileImagePlaceholder: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8579F1",
  },

  profileImagePlaceholderText: {
    fontSize: 26,
    fontFamily: "yeonTheLand",
    fontWeight: "normal",
    color: "white",
  },

  profileContent: {
    gap: 4,
  },

  profileContentName: {
    color: "#1A1A1A",
    fontSize: 18,
    fontFamily: "Pretendard-SemiBold",
  },

  profileContentEmail: {
    fontFamily: "Pretendard-Regular",
    fontSize: 12,
    color: "#808080",
  },
});
