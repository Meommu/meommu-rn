// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// styles
import { styles } from "./index.styles";

export function CaretRightButton({ style, ...props }: PressableProps) {
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
        <CaretRight />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
