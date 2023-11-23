// react
import { Text, TextProps } from "react-native";

// constants
import { color } from "@/constants";

interface AlertTextProps extends TextProps {
  condition: boolean;
}

export function AlertText({ condition, children }: AlertTextProps) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontFamily: "Pretendard-SemiBold",
        color: condition ? color.success : color.error,
      }}
    >
      {children}
    </Text>
  );
}
