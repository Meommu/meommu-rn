// react
import { View, TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {}

export function FormInput({ ...props }: FormInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#B7B7CB"
        {...props}
      />
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
