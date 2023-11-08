// react
import { View } from "react-native";
import type { ViewProps } from "react-native";

interface SViewProps extends ViewProps {}

/**
 * SView: Skeleton View (스켈레톤 뷰)
 */
export function SView({ style }: SViewProps) {
  return (
    <View style={[style, { backgroundColor: "lightgray", borderRadius: 10 }]} />
  );
}
