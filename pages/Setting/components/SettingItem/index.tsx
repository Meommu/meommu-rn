// react
import { Pressable, type PressableProps, Text } from "react-native";
import Animated from "react-native-reanimated";

// hooks
import { usePressInOutAnimation } from "@/hooks";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// styles
import { styles } from "./index.styles";

interface SettingItemProps extends PressableProps {
  title: string;
}

export function SettingItem({ title, ...props }: SettingItemProps) {
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
        <Text style={styles.buttonText}>{title}</Text>

        <CaretRight />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
