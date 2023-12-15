// react
import React from "react";
import { View, Text, type ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// hooks
import { useDynamicStyle } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface HeaderProps extends ViewProps {
  title?: string | React.ReactNode;

  left?: React.ReactNode;

  right?: React.ReactNode;

  notch?: boolean;
}

export function Header({
  title,
  left,
  right,
  notch = true,
  style,
  ...props
}: HeaderProps) {
  const { top } = useSafeAreaInsets();

  const notchStyle = useDynamicStyle(() => {
    if (notch) {
      return {
        marginTop: top,
      };
    }

    return {};
  }, [notch, top]);

  return (
    <View style={[style, styles.container, notchStyle]} {...props}>
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
