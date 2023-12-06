// react
import { Pressable, type PressableProps } from "react-native";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

// styles
import { styles } from "./index.styles";

export function GoBackButton({ style, ...props }: PressableProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <CaretLeft />
    </Pressable>
  );
}
