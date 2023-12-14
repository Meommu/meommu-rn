// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

// styles
import { styles } from "./index.styles";

export function GoBackButton({ style, ...props }: PressableProps) {
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
        onHoverIn={handleButtonPressIn}
        onHoverOut={handleButtonPressOut}
        {...props}
      >
        <CaretLeft />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
