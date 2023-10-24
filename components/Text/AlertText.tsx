// react
import { Text, TextProps } from "react-native";

interface AlertTextProps extends TextProps {
  condition: boolean;
}

export function AlertText({ condition, children }: AlertTextProps) {
  return (
    <Text
      style={{
        fontSize: 14,
        fontFamily: "Pretendard-SemiBold",
        color: condition ? "#63BCA9" : "#FF8585",
      }}
    >
      {children}
    </Text>
  );
}
