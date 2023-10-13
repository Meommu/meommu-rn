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
        color: condition ? "#FF8585" : "#63BCA9",
      }}
    >
      {children}
    </Text>
  );
}
