// react
import { type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

// styles
import { styles } from "./index.styles";

export function GoBackButton({ style, ...props }: PressableProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <CaretLeft />
    </InteractionPressable>
  );
}
