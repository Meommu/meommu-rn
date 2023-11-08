// react
import { Text } from "react-native";
import type { TextProps } from "react-native";

interface STextProps extends TextProps {
  textLength: number;
}

const BLANK = "ㅤ";

/**
 * SText: Skeleton Text
 */
export function SText({ style, textLength }: STextProps) {
  return (
    <Text
      style={[
        style,
        {
          color: "transparent",
          backgroundColor: "lightgray",
          borderRadius: 10,
        },
      ]}
    >
      {Array(textLength)
        .fill(null)
        .map(() => BLANK)}
    </Text>
  );
}
