// react
import { Pressable, type PressableProps } from "react-native";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

// constants
import { color } from "@/constants";

// styles
import { styles } from "./index.styles";

interface KebabMenuButtonProps extends PressableProps {
  fill?: string;
}

export function KebabMenuButton({
  fill = color.g200,
  ...props
}: KebabMenuButtonProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <ThreeDotsVertical fill={fill} />
    </Pressable>
  );
}
