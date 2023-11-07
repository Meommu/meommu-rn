// react
import { useMemo } from "react";
import { View, Text } from "react-native";
import type { ViewProps, DimensionValue } from "react-native";

interface SViewProps extends ViewProps {
  width?: DimensionValue;
  height?: DimensionValue;
  textLength?: number;
}

/**
 * SView: Skeleton View (스켈레톤 뷰)
 */
export function SView({
  width = "auto",
  height = "auto",
  textLength,
}: SViewProps) {
  const blank = useMemo(() => "ㅤ", []);

  return (
    <View
      style={{ width, height, backgroundColor: "lightgray", borderRadius: 10 }}
    >
      {textLength && (
        <Text style={{ color: "transparent" }}>
          {Array(textLength).fill(blank).join("")}
        </Text>
      )}
    </View>
  );
}
