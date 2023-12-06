// react
import { StyleSheet } from "react-native";

// constants
import { color, font } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: color.w,
  },

  headerLayout: {
    padding: 12,
  },

  profileImageLayout: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 21,
    marginBottom: 45,
  },

  profileImage: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: color.primary,

    borderRadius: 36,
  },

  profileImageText: {
    color: color.w,
    fontFamily: font.YeonTheLand,
    fontSize: 26,
  },
});
