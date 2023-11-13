// react
import { View, Pressable, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import Plus from "@/assets/svgs/plus.svg";

interface PlusButtonProps extends PressableProps {}

export function PlusButton({ ...props }: PlusButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.hitBox} {...props}>
        <Plus />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
  },

  hitBox: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
