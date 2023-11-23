// react
import { TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

// constants
import { color } from "@/constants";

export function FormInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={color.g2}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    flexShrink: 1,
    backgroundColor: color.g1,
    borderRadius: 4,
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
    paddingHorizontal: 13,
    paddingVertical: 10,
  },
});
