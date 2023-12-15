// react
import { usePressInOutAnimation } from "@/hooks";
import {
  Pressable,
  type StyleProp,
  type PressableProps,
  type ViewStyle,
} from "react-native";
import Animated from "react-native-reanimated";

// styles
import { styles } from "./index.styles";

interface InteractionPressableProps extends PressableProps {
  style?: StyleProp<ViewStyle>;

  containerStyle?: StyleProp<ViewStyle>;
}

export function InteractionPressable({
  style,

  containerStyle,

  children,

  ...props
}: InteractionPressableProps) {
  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  return (
    <Animated.View
      style={[styles.containerLayout, style, containerAnimatedStyle]}
    >
      <Pressable
        style={[styles.container, containerStyle]}
        onPressIn={handleButtonPressIn}
        onPressOut={handleButtonPressOut}
        onHoverIn={handleButtonPressIn}
        onHoverOut={handleButtonPressOut}
        onTouchStart={handleButtonPressIn}
        onTouchMove={handleButtonPressIn}
        onTouchEnd={handleButtonPressOut}
        {...props}
      >
        {children}
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
