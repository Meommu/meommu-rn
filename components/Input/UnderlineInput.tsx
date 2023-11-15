// react
import { View, TextInput, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

interface UnderlineInput extends TextInputProps {}

export function UnderlineInput({ style, ...props }: UnderlineInput) {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#69697A"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#69697A",
  },

  input: {
    fontFamily: "yeonTheLand",
    fontSize: 20,
    textAlign: "center",
    paddingBottom: 4,
  },
});
