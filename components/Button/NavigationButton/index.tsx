// react
import {
  Text,
  Pressable,
  type PressableProps,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// constants
import { color, size } from "@/constants";

// styles
import { styles } from "./index.styles";
import { usePressInOutAnimation } from "@/hooks";

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

  fontColor = color.w,

  style,

  disabled,

  ...props
}: NavigationButtonProps) {
  const {
    handleButtonPressIn,
    handleButtonPressOut,
    containerAnimatedStyle,
    Dimmed,
  } = usePressInOutAnimation();

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={[
          styles.content,
          { backgroundColor: disabled ? color.g300 : backgroundColor },
        ]}
        disabled={disabled || isLoading}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        {isLoading && <ActivityIndicator color={color.primaryB} />}
        <Text style={[styles.buttonText, { color: fontColor }]}>{content}</Text>
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
