import { View, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import Constants from "expo-constants";

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    height: "100%",
    aspectRatio: "9 / 16",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
  },
});
