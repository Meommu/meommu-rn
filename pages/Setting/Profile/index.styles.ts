// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

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
    marginTop: 21,
    marginBottom: 45,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImage: {
    width: 90,
    height: 90,
    backgroundColor: color.primary,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  profileImageText: {
    fontFamily: "yeonTheLand",
    fontSize: 26,
    color: color.w,
  },
});
