// react
import { Text, type PressableProps } from "react-native";

// conponents
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// styles
import { styles } from "./index.styles";

interface HomeNavigationButtonProps extends PressableProps {
  content: string;
}

export function HomeNavigationButton({
  content,
  style,
  ...props
}: HomeNavigationButtonProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <Text style={styles.buttonText}>{content}</Text>
    </InteractionPressable>
  );
}
