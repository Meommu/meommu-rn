// react
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// styles
import { ids, styles } from "./index.styles";

interface ResponsiveLayoutViewProps {
  children: React.ReactNode;
}

export function ResponsiveLayoutView({ children }: ResponsiveLayoutViewProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={[styles.notch, { height: top }]} />

      <View style={styles.content}>{children}</View>
    </View>
  );
}
