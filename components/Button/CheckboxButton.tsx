// react
import { View, Pressable } from "react-native";
import type { PressableProps } from "react-native";
import { Svg, Circle } from "react-native-svg";

// svgs
import Check from "@/assets/svgs/check.svg";

// constants
import { color } from "@/constants";

interface CheckBoxButtonProps extends PressableProps {
  isCheck: boolean;
}

export function CheckBoxButton({ isCheck, ...props }: CheckBoxButtonProps) {
  const circleFill = isCheck ? color.agreementClicked : color.formElementBg;

  return (
    <Pressable {...props}>
      <View
        style={{
          position: "relative",
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            position: "absolute",
          }}
        >
          <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <Circle cx="13" cy="13" r="13" fill={circleFill} />
          </Svg>
        </View>
        <Check style={{ position: "absolute", zIndex: 1 }} />
      </View>
    </Pressable>
  );
}
