// react
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import type { PressableProps } from "react-native";

// constants
import { color } from "@/constants";

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
      ? color.g2
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.g1,
    borderRadius: 4,
    position: "relative",
  },

  border: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderRadius: 4,
  },

  content: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },

  contentText: {
    fontSize: 16,
    fontFamily: "Pretendard-SemiBold",
  },
});
