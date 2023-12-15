// react
import { type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// constants
import { color } from "@/constants";

// svgs
import CaretLeft from "@/assets/svgs/caret-left.svg";

// styles
import { styles } from "./index.styles";

interface CaretLeftButtonProps extends PressableProps {
  fill?: string;
}

export function CaretLeftButton({
  style,
  fill = color.g400,
  ...props
}: CaretLeftButtonProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <CaretLeft fill={fill} />
    </InteractionPressable>
  );
}
