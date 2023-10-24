// react
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface FormDupChkButtonProps extends TouchableOpacityProps {
  isDupChk: boolean | null;
}

export function FormDupChkButton({
  isDupChk,
  ...props
}: FormDupChkButtonProps) {
  const getFontColor = (): string => {
    if (isDupChk === null) {
      return "#B7B7CB";
    }

    if (isDupChk === false) {
      return "#FF8585";
    }

    return "#63BCA9";
  };

  const getBorderColor = (): string => {
    if (isDupChk === null) {
      return "transparent";
    }

    if (isDupChk === false) {
      return "#FF8585";
    }

    return "#63BCA9";
  };

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
          borderColor: getBorderColor(),
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Pretendard-SemiBold",
            color: getFontColor(),
          }}
        >
          중복확인
        </Text>
      </View>
    </TouchableOpacity>
  );
}
