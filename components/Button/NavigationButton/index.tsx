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
  const backgroundColor = disabled ? color.g300 : color.primary;

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withTiming(scale.value, { duration: 100 }) }],
    };
  });

  const dimmedAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity.value, { duration: 100 }),
    };
  });

  const handleButtonPressIn = () => {
    scale.value = 0.98;
    opacity.value = 0.1;
  };

  const handleButtonPressOut = () => {
    scale.value = 1;
    opacity.value = 0;
  };

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={[styles.content, { backgroundColor }]}
        disabled={disabled || isLoading}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        {isLoading && <ActivityIndicator color={color.primaryB} />}
        <Text style={styles.buttonText}>{content}</Text>
      </Pressable>

      <Animated.View style={[styles.dimmed, dimmedAnimatedStyle]} />
    </Animated.View>
  );
}
