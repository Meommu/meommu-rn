// react
import { Text, Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface TransparentButtonProps extends PressableProps {
  content: string;
}

export function TransparentButton({
  content,
  style,
  ...props
}: TransparentButtonProps) {
  const {
    containerAnimatedStyle,
    handleButtonPressIn,
    handleButtonPressOut,
    Dimmed,
  } = usePressInOutAnimation();

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={styles.button}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <Text style={styles.buttonText}>{content}</Text>
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
