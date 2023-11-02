import {
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import type { KeyboardAvoidingViewProps } from "react-native";

interface KViewProps extends KeyboardAvoidingViewProps {}

/**
 * input이 내부에 존재하는 화면을 구현할 때 사용하는 뷰
 */
export function KView({ children, ...props }: KViewProps) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "position"}
        {...props}
      >
        {children}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
