// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// constants
import { color } from "@/constants";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

// styles
import { styles } from "./index.styles";

interface CaretLeftButtonProps extends PressableProps {
  fill?: string;
}

export function CaretLeftButton({
  style,
  fill = color.g300,
  ...props
}: CaretLeftButtonProps) {
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
        <CaretLeft fill={fill} />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
