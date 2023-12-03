// react
import { View, type ViewProps } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { styles } from "./index.styles";

interface FooterProps extends ViewProps {
  children: React.ReactNode;
}

export function Footer({ children, style }: FooterProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, style, { paddingBottom: 13 + bottom }]}>
      {children}
    </View>
  );
}
