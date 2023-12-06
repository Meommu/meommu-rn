// react
import { Pressable, type PressableProps } from "react-native";

// svgs
import GearSix from "@/assets/svgs/gear-six.svg";

// styles
import { styles } from "./index.styles";

export function SettingButton(props: PressableProps) {
  return (
    <Pressable style={styles.container} {...props}>
      <GearSix />
    </Pressable>
  );
}
