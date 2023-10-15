import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import type { ReactNode } from "react";
import Constants from "expo-constants";

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.select({
        ios: "padding",
        android: undefined,
        web: undefined,
      })}
    >
      <View style={styles.container}>{children}</View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
  },
});
