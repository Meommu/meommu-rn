// react
import React from "react";
import {
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./index.styles";

interface ResponsiveKeyboardAvoidingViewProps {
  children: React.ReactNode;
}

export function ResponsiveKeyboardAvoidingView({
  children,
}: ResponsiveKeyboardAvoidingViewProps) {
  const { bottom } = useSafeAreaInsets();

  if (Platform.OS === "ios") {
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={-bottom}
        >
          {children}
        </KeyboardAvoidingView>
      </Pressable>
    );
  }

  if (Platform.OS === "android") {
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        {children}
      </Pressable>
    );
  }

  return <View style={styles.container}>{children}</View>;
}
