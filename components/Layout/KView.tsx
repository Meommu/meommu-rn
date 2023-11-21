// react
import {
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Platform,
  View,
  StyleSheet,
} from "react-native";
import type { KeyboardAvoidingViewProps } from "react-native";

interface KViewProps extends KeyboardAvoidingViewProps {}

/**
 * input이 내부에 존재하는 화면을 구현할 때 사용하는 뷰
 */
export function KView({ children, ...props }: KViewProps) {
  if (Platform.OS === "ios") {
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="padding" {...props}>
          {children}
        </KeyboardAvoidingView>
      </Pressable>
    );
  }

  if (Platform.OS === "android") {
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View {...props}>{children}</View>
      </Pressable>
    );
  }

  return <View {...props}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    ...Platform.select({
      web: {
        cursor: "normal",
      },
    }),
  },
});
