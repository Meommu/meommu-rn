// react
import { View, Text, Pressable, type PressableProps } from "react-native";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface NavigationButtonProps extends PressableProps {
  content: string;

  isLoading?: boolean;
}

export function NavigationButton({
  content,

  isLoading = false,

  style,

  disabled,

  ...props
}: NavigationButtonProps) {
  const backgroundColor = disabled
    ? color.g300
    : isLoading
    ? color.primaryB
    : color.primary;

  return (
    <Pressable
      style={[styles.container, { backgroundColor }]}
      disabled={disabled || isLoading}
      {...props}
    >
      <Text style={styles.buttonText}>{content}</Text>
    </Pressable>
  );
}
