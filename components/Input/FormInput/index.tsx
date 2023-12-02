// react
import { TextInput, type TextInputProps } from "react-native";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

export function FormInput({ style, ...props }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={color.g300}
      {...props}
    />
  );
}
