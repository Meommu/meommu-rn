import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface FormDupChkButtonProps extends TouchableOpacityProps {
  isDup: boolean | null;
}

export function FormDupChkButton({ isDup, ...props }: FormDupChkButtonProps) {
  const fontColor = isDup === null ? "#B7B7CB" : !isDup ? "#63BCA9" : "#FF8585";

  const borderColor =
    isDup === null ? "transparent" : !isDup ? "#63BCA9" : "#FF8585";

  const BORDER_WIDTH = 2;

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          /**
           * native는 box-sizing 속성이 border-box 처럼 동작하지만 고정 height를 주지 않았기 때문에
           * 테두리 두께에 따라 크기가 달라지므로 테두리 두께 값을 적절히 빼 줌
           */
          paddingHorizontal: 18 - BORDER_WIDTH,
          paddingVertical: 10 - BORDER_WIDTH,
          backgroundColor: "#EBEBF0",
          borderRadius: 4,
          borderWidth: BORDER_WIDTH,
          borderColor: borderColor,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Pretendard-SemiBold",
            color: fontColor,
          }}
        >
          중복확인
        </Text>
      </View>
    </TouchableOpacity>
  );
}
