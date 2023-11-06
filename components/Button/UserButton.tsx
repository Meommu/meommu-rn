// react
import { Pressable, PressableProps } from "react-native";

// svgs
import User from "@/assets/svgs/user.svg";

interface UserButtonProps extends PressableProps {}

export function UserButton({ ...props }: UserButtonProps) {
  return (
    <Pressable {...props}>
      <User />
    </Pressable>
  );
}
