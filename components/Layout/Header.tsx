// react
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import type { ViewProps } from "react-native";

interface HeaderProps extends ViewProps {
  title?: string | React.ReactNode;
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

      <View style={styles.title}>
        {typeof title === "string" ? (
          <Text style={styles.titleText}>{title}</Text>
        ) : (
          title
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  controller: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  title: {
    position: "absolute",
  },

  titleText: {
    fontSize: 20,
    fontFamily: "Pretendard-SemiBold",
    color: "#2B2B32",
  },
});
