// react
import { type PressableProps } from "react-native";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// constants
import { color } from "@/constants";

// svgs
import CaretRight from "@/assets/svgs/caret-right.svg";

// styles
import { styles } from "./index.styles";

interface CaretRightButtonProps extends PressableProps {
  fill?: string;
}

export function CaretRightButton({
  style,
  fill = color.g300,
  ...props
}: CaretRightButtonProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <CaretRight fill={fill} />
    </InteractionPressable>
  );
}
