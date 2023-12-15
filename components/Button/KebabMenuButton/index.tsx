// react
import { type PressableProps } from "react-native";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

// constants
import { color } from "@/constants";

// components
import { InteractionPressable } from "@/components/Pressable/InteractionPressable";

// styles
import { styles } from "./index.styles";

interface KebabMenuButtonProps extends PressableProps {
  fill?: string;
}

export function KebabMenuButton({
  style,
  fill = color.g200,
  ...props
}: KebabMenuButtonProps) {
  return (
    <InteractionPressable containerStyle={styles.button} {...props}>
      <ThreeDotsVertical fill={fill} />
    </InteractionPressable>
  );
}
