// react
import { Text, type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// styles
import { styles } from "./index.styles";

export function CompleteButton({ style, ...props }: PressableProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <Text style={styles.buttonText}>완료</Text>
    </InteractionPressable>
  );
}
