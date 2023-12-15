// react
import React from "react";
import { View } from "react-native";

// styles
import { ids, styles } from "./index.styles";

interface ResponsiveLayoutViewProps {
  children: React.ReactNode;
}

export function ResponsiveLayoutView({ children }: ResponsiveLayoutViewProps) {
  return (
    <View style={styles.container} dataSet={{ media: ids.container }}>
      <View style={styles.content}>{children}</View>
    </View>
  );
}
