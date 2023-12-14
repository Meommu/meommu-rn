// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// constants
import { color } from "@/constants";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// styles
import { styles } from "./index.styles";

interface CaretRightButtonProps extends PressableProps {
  fill?: string;
}

export function CaretRightButton({
  style,
  fill = color.g300,
  ...props
}: CaretRightButtonProps) {
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
        <CaretRight fill={fill} />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
