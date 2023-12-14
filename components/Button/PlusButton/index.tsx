// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// svgs
import Plus from "@/assets/svgs/plus.svg";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// styles
import { styles } from "./index.styles";

export function PlusButton(props: PressableProps) {
  const {
    handleButtonPressIn,
    handleButtonPressOut,
    containerAnimatedStyle,
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
        <Plus />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
