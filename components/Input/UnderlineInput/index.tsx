// react
import { View, TextInput, type TextInputProps } from "react-native";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

export function UnderlineInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={color.g400}
      {...props}
    />
  );
}
