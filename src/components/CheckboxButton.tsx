import { View, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Check from "../../assets/svgs/check.svg";
import { Svg, Circle } from "react-native-svg";

interface CheckBoxButtonProps extends TouchableOpacityProps {
  isCheck: boolean;
}

export function CheckBoxButton({ isCheck, ...props }: CheckBoxButtonProps) {
  const circleFill = isCheck ? "#1C1D22" : "#EBEBF0";

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          position: "relative",
          width: 26,
          height: 26,
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
    </TouchableOpacity>
  );
}
