// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

// constants
import { color } from "@/constants";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// styles
import { styles } from "./index.styles";

interface KebabMenuButtonProps extends PressableProps {
  fill?: string;
}

export function KebabMenuButton({
  fill = color.g200,
  ...props
}: KebabMenuButtonProps) {
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
        <ThreeDotsVertical fill={fill} />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
