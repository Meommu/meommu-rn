// react
import React from "react";
import { View, Text, Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// constants
import { color } from "@/constants";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface FormDupChkButtonProps extends PressableProps {
  isDupChk: boolean | null;
}

export function FormDupChkButton({
  isDupChk,
  style,
  ...props
}: FormDupChkButtonProps) {
  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  const fontColor =
    isDupChk === null
      ? color.g300
      : isDupChk === false
      ? color.error
      : color.success;

  const borderColor =
    isDupChk === null
      ? "transparent"
      : isDupChk === false
      ? color.error
      : color.success;

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={styles.button}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <View style={[styles.border, { borderColor }]} />

        <View style={styles.content}>
          <Text style={[styles.contentText, { color: fontColor }]}>
            중복확인
          </Text>
        </View>
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
