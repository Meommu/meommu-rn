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
  const stateColor =
    isDup === null ? "#B7B7CB" : !isDup ? "#63BCA9" : "#FF8585";

  console.log(stateColor);

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          paddingHorizontal: 18,
          paddingVertical: 10,
          backgroundColor: "#EBEBF0",
          borderRadius: 4,
          borderColor: stateColor,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Pretendard-SemiBold",
            color: stateColor,
          }}
        >
          중복확인
        </Text>
      </View>
    </TouchableOpacity>
  );
}
