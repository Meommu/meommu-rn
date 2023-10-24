// react
import { View, TextInput, Pressable } from "react-native";
import type { TextInputProps } from "react-native";

interface FormInputProps extends TextInputProps {}

export function FormInput({ ...props }: FormInputProps) {
  return (
    <View
      style={{
        flexShrink: 1,
        flexGrow: 1,
      }}
    >
      <Pressable onPress={(e) => e.stopPropagation()}>
        <TextInput
          style={{
            width: "100%",
            backgroundColor: "#EBEBF0",
            borderRadius: 4,
            fontSize: 16,
            fontFamily: "Pretendard-SemiBold",
            paddingHorizontal: 13,
            paddingVertical: 10,
          }}
          placeholderTextColor="#B7B7CB"
          {...props}
        />
      </Pressable>
    </View>
  );
}
