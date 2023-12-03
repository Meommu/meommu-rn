// react
import { View } from "react-native";
import React from "react";

// styles
import { styles } from "./index.styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface FooterProps {
  children: React.ReactNode;
}

export function Footer({ children }: FooterProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginBottom: bottom }]}>{children}</View>
  );
}
