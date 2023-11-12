// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { ViewProps } from "react-native";

interface HeaderProps extends ViewProps {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ title, left, right, style, ...props }: HeaderProps) {
  return (
    <View style={[style, styles.container]} {...props}>
      <View style={styles.controller}>
        {left || <View />}
        {right || <View />}
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },

  controller: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#2B2B32",
    position: "absolute",
  },
});
