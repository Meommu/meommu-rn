// react
import React from "react";
import { View, Text, Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// constants
import { color } from "@/constants";

// hooks
import { useDynamicStyle, usePressInOutAnimation } from "@/hooks";

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

  const fontColorStyle = useDynamicStyle(() => {
    if (isDupChk === null) {
      return {
        color: color.g300,
      };
    }

    return {
      color: isDupChk ? color.success : color.error,
    };
  }, [isDupChk]);

  const borderStyle = useDynamicStyle(() => {
    if (isDupChk === null) {
      return {};
    }

    return {
      borderWidth: 2,
      borderRadius: 4,
      borderColor: isDupChk ? color.success : color.error,
    };
  }, [isDupChk]);

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={styles.content}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <Text style={[styles.contentText, fontColorStyle]}>중복확인</Text>
      </Pressable>

      <View style={[styles.border, borderStyle]} />

      {Dimmed}
    </Animated.View>
  );
}
