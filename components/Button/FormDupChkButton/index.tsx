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
        style={styles.button}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <View style={[styles.buttonBorder, borderStyle]} />

        <View style={styles.buttonContent}>
          <Text style={[styles.buttonContentText, fontColorStyle]}>
            중복확인
          </Text>
        </View>
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
