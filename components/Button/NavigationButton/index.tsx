// react
import { Text, type PressableProps, ActivityIndicator } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// constants
import { color } from "@/constants";

// hooks
import { useDynamicStyle } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface NavigationButtonProps extends PressableProps {
  content: string;

  isLoading?: boolean;

  backgroundColor?: string;

  fontColor?: string;
}

export function NavigationButton({
  content,

  isLoading = false,

  backgroundColor = color.primary,

  fontColor,

  style,

  disabled,

  ...props
}: NavigationButtonProps) {
  const buttonBackgroundStyle = useDynamicStyle(() => {
    if (disabled) {
      return {
        backgroundColor: color.g300,
      };
    }

    return {
      backgroundColor,
    };
  }, [disabled]);

  const fontColorStyle = useDynamicStyle(() => {
    if (!fontColor) {
      return {
        color: color.w,
      };
    }

    return {
      color: fontColor,
    };
  }, [fontColor]);

  return (
    <InteractionPressable
      style={[styles.layout, buttonBackgroundStyle]}
      containerStyle={styles.button}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ActivityIndicator color={color.primaryB} />}

      <Text style={[styles.buttonText, fontColorStyle]}>{content}</Text>
    </InteractionPressable>
  );
}
