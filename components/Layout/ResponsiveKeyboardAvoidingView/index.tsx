// react
import React from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  View,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ResponsiveKeyboardAvoidingViewProps {
  children: React.ReactNode;
}

/**
 * input이 내부에 존재하는 화면을 구현할 때 사용하는 뷰
 */
export function ResponsiveKeyboardAvoidingView({
  children,
}: ResponsiveKeyboardAvoidingViewProps) {
  const { top } = useSafeAreaInsets();

  if (Platform.OS === "ios") {
    return (
      <Pressable style={styles.fillScreen} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.fillScreen}
          behavior="padding"
          keyboardVerticalOffset={top}
        >
          {children}
        </KeyboardAvoidingView>
      </Pressable>
    );
  }

  if (Platform.OS === "android") {
    return (
      <Pressable style={styles.fillScreen} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    );
  }

  return <View style={styles.fillScreen}>{children}</View>;
}

const styles = StyleSheet.create({
  fillScreen: {
    width: "100%",
    height: "100%",
    ...Platform.select({
      web: {
        cursor: "normal",
      },
    }),
  },
});
