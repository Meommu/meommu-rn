// react
import { View, StyleSheet, Pressable } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

export function GoBackButton({ style, ...props }: PressableProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.content} {...props}>
        <CaretLeft />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
  },

  content: {
    width: "100%",
    height: "100%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
