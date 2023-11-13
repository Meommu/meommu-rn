// react
import { View, Text, StyleSheet, Pressable } from "react-native";
import type { PressableProps } from "react-native";

// constants
import { color, size } from "@/constants";

interface NavigationButtonProps extends PressableProps {
  fontColor?: string;
  backgroundColor?: string;
  content?: string;
}

export function NavigationButton({
  backgroundColor = color.primary,
  fontColor = "white",
  content,
  style,
  ...props
}: NavigationButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={[styles.content, { backgroundColor }]} {...props}>
        <Text style={[styles.buttonText, { color: fontColor }]}>{content}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: size.NAVIGATION_BUTTON_HEIGHT,
    borderRadius: 6,
    overflow: "hidden",
  },

  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },
});
