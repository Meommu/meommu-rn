// react
import { StyleSheet } from "react-native";

// constants
import { color } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderRadius: 100,
    borderColor: color.g400,

    backgroundColor: color.w,
  },
});
