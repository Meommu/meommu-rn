// react
import {
  Text,
  ActivityIndicator,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native";

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

  style?: StyleProp<ViewStyle>;

  isLoading?: boolean;

  backgroundColor?: string;

  disableBackgroundColor?: string;

  fontColor?: string;
}

export function NavigationButton({
  content,

  isLoading = false,

  backgroundColor = color.primary,

  disableBackgroundColor = color.g300,

  fontColor = color.w,

  style,

  disabled,

  ...props
}: NavigationButtonProps) {
  const buttonBackgroundStyle = useDynamicStyle(() => {
    if (disabled) {
      return {
        backgroundColor: disableBackgroundColor,
      };
    }

    return {
      backgroundColor,
    };
  }, [disabled]);

  const fontColorStyle = useDynamicStyle(() => {
    return { color: fontColor };
  }, [fontColor]);

  return (
    <InteractionPressable
      style={[styles.layout, style, buttonBackgroundStyle]}
      containerStyle={styles.button}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <ActivityIndicator color={color.primaryB} />}

      <Text style={[styles.buttonText, fontColorStyle]}>{content}</Text>
    </InteractionPressable>
  );
}
