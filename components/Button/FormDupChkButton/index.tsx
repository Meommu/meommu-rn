// react
import React from "react";
import { View, Text, Pressable, type PressableProps } from "react-native";

// constants
import { color } from "@/constants";

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
    <Pressable style={styles.container} {...props}>
      <View style={[styles.border, { borderColor }]} />

      <View style={styles.content}>
        <Text style={[styles.contentText, { color: fontColor }]}>중복확인</Text>
      </View>
    </Pressable>
  );
}
