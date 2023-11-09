// react
import { useRef } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {}

export function FormInput({ ...props }: FormInputProps) {
  const textInputRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <Pressable
        focusable={false}
        onFocus={() => {
          textInputRef.current?.focus();
        }}
      >
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholderTextColor="#B7B7CB"
          {...props}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },

  input: {
    width: "100%",
    backgroundColor: "#EBEBF0",
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
});
