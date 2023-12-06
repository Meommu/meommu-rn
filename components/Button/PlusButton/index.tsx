// react
import { Pressable, type PressableProps } from "react-native";

// svgs
import Plus from "@/assets/svgs/plus.svg";

// styles
import { styles } from "./index.styles";

export function PlusButton(props: PressableProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <Plus />
    </Pressable>
  );
}
