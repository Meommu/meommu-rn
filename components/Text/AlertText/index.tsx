// react
import { Text, type TextProps } from "react-native";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface AlertTextProps extends TextProps {
  condition: boolean;
}

export function AlertText({ condition, children }: AlertTextProps) {
  return (
    <Text
      style={[
        styles.alertText,
        {
          color: condition ? color.success : color.error,
        },
      ]}
    >
      {children}
    </Text>
  );
}
