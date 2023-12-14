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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scale.value, {
            duration: size.BUTTON_PRESS_IN_OUT_DURATION,
          }),
        },
      ],
    };
  });

  const dimmedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, {
        duration: size.BUTTON_PRESS_IN_OUT_DURATION,
      }),
    };
  });

  const handleButtonPressIn = () => {
    scale.value = 0.96;
    opacity.value = 0.15;
  };

  const handleButtonPressOut = () => {
    scale.value = 1;
    opacity.value = 0;
  };

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

      <Animated.View style={[styles.dimmed, dimmedAnimatedStyle]} />
    </Animated.View>
  );
}
