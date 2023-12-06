// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,

    padding: 12,
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

    backgroundColor: color.primary,
  },

  profileImagePlaceholderText: {
    color: color.w,
    fontSize: 26,
    fontFamily: font.YeonTheLand,
    fontWeight: "normal",
  },

  profileContent: {
    gap: 4,
  },

  profileContentName: {
    color: color.g800,
    fontSize: 18,
    fontFamily: font.PretendardSemiBold,
  },

  profileContentEmail: {
    color: color.g400,
    fontFamily: font.PretendardRegular,
    fontSize: 12,
  },
});
