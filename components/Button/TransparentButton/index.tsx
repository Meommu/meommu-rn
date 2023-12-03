// react
import { Text, Pressable, type PressableProps } from "react-native";

// styles
import { styles } from "./index.styles";

interface TransparentButtonProps extends PressableProps {
  content: string;
}

export function TransparentButton({
  content,
  style,
  ...props
}: TransparentButtonProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <Text style={styles.contentText}>{content}</Text>
    </Pressable>
  );
}
