// react
import { type PressableProps } from "react-native";

// svgs
import Plus from "@/assets/svgs/plus.svg";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// styles
import { styles } from "./index.styles";

export function PlusButton({ style, ...props }: PressableProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <Plus />
    </InteractionPressable>
  );
}
