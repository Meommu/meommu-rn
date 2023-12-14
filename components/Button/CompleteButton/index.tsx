// react
import Animated from "react-native-reanimated";
import { Pressable, Text, type PressableProps } from "react-native";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// styles
import { styles } from "./index.styles";

export function CompleteButton(props: PressableProps) {
  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  return (
    <Animated.View style={[styles.container, containerAnimatedStyle]}>
      <Pressable
        style={styles.button}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        {...props}
      >
        <Text style={styles.buttonText}>완료</Text>
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
