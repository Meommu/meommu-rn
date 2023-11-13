// react
import { useRef } from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import type { TextInputProps } from "react-native";

interface UnderlineInput extends TextInputProps {}

export function UnderlineInput({ ...props }: UnderlineInput) {
  const textInputRef = useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <Pressable
        onFocus={() => {
          textInputRef.current?.focus();
        }}
      >
        <TextInput
          ref={textInputRef}
          style={styles.input}
          placeholderTextColor="#69697A"
          {...props}
        />
      </Pressable>
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
