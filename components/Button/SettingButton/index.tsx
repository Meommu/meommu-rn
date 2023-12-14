// react
import { Pressable, type PressableProps } from "react-native";
import Animated from "react-native-reanimated";

// svgs
import GearSix from "@/assets/svgs/gear-six.svg";

// styles
import { styles } from "./index.styles";
import { usePressInOutAnimation } from "@/hooks";

export function SettingButton(props: PressableProps) {
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
        <GearSix />
      </Pressable>

      {Dimmed}
    </Animated.View>
  );
}
