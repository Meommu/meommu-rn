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

  disabled,

  ...props
}: InteractionPressableProps) {
  const {
    containerAnimatedStyle,
    Dimmed,
    handleButtonPressIn,
    handleButtonPressOut,
  } = usePressInOutAnimation();

  const _handleButtonPressIn = () => {
    if (disabled) {
      return;
    }

    handleButtonPressIn();
  };

  const _handleButtonPressOut = () => {
    if (disabled) {
      return;
    }

    handleButtonPressOut();
  };

  return (
    <Animated.View
      style={[styles.containerLayout, style, containerAnimatedStyle]}
    >
      <Pressable
        style={containerStyle}
        onPressIn={_handleButtonPressIn}
        onPressOut={_handleButtonPressOut}
        onHoverIn={_handleButtonPressIn}
        onHoverOut={_handleButtonPressOut}
        onTouchStart={_handleButtonPressIn}
        onTouchMove={_handleButtonPressIn}
        onTouchEnd={_handleButtonPressOut}
        disabled={disabled}
        {...props}
      >
        {children}
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
