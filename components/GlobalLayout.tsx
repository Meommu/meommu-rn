import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import type { ReactNode } from "react";
import Constants from "expo-constants";

interface GlobalLayoutProps {
  children: ReactNode;
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  if (Platform.OS === "ios") {
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

  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
});
