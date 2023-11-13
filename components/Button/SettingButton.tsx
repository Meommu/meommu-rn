// react
import { View, Pressable, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import GearSix from "@/assets/svgs/gear-six.svg";

interface SettingButtonProps extends PressableProps {}

export function SettingButton({ style, ...props }: SettingButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.content} {...props}>
        <GearSix />
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
