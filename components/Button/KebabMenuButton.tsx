// react
import { Pressable } from "react-native";
import type { PressableProps } from "react-native";

// svgs
import ThreeDotsVertical from "@/assets/svgs/three-dots-vertical.svg";

interface KebabMenuButtonProps extends PressableProps {}

export function KebabMenuButton({ ...props }: KebabMenuButtonProps) {
  return (
    <Pressable style={{ width: 20, height: 20 }} {...props}>
      <ThreeDotsVertical />
    </Pressable>
  );
}
