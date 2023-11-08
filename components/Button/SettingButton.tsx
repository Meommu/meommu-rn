// react
import { Pressable, PressableProps } from "react-native";

// svgs
import GearSix from "@/assets/svgs/gear-six.svg";

interface SettingButtonProps extends PressableProps {}

export function SettingButton({ ...props }: SettingButtonProps) {
  return (
    <Pressable {...props}>
      <GearSix />
    </Pressable>
  );
}
