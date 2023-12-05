// react
import { View, Pressable, type PressableProps } from "react-native";
import { Svg, Circle } from "react-native-svg";

// svgs
import Check from "@/assets/svgs/check.svg";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface CheckBoxButtonProps extends PressableProps {
  isCheck: boolean;
}

export function CheckBoxButton({ isCheck, ...props }: CheckBoxButtonProps) {
  const circleFill = isCheck ? color.g800 : color.g200;

  return (
    <Pressable style={styles.container} {...props}>
      <View style={styles.circle}>
        <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <Circle cx="13" cy="13" r="13" fill={circleFill} />
        </Svg>
      </View>

      <Check style={styles.check} />
    </Pressable>
  );
}
