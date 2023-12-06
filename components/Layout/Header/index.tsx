// react
import React from "react";
import { View, Text, type ViewProps } from "react-native";

// styles
import { styles } from "./index.styles";

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
