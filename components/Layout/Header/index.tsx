// react
import React from "react";
import { View, Text, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./index.styles";

interface HeaderProps extends ViewProps {
  title?: string | React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ title, left, right, style, ...props }: HeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[style, styles.container, { marginTop: top }]} {...props}>
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
