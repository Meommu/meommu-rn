// react
import { Pressable, PressableProps } from "react-native";

// svgs
import Plus from "@/assets/svgs/plus.svg";

interface PlusButtonProps extends PressableProps {}

export function PlusButton({ ...props }: PlusButtonProps) {
  return (
    <Pressable {...props}>
      <Plus />
    </Pressable>
  );
}
