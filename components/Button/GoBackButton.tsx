// react
import { View, StyleSheet, Pressable } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

interface GoBackButtonProps extends PressableProps {
  isHidden?: boolean;
}

export function GoBackButton({
  style,
  isHidden = false,
  ...props
}: GoBackButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.content, { opacity: isHidden ? 0 : 1 }]}
        {...props}
      >
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
