// react
import { View } from "react-native";

// svgs
import X from "@/assets/svgs/x.svg";

// styles
import { styles } from "./index.styles";

// constants
import { color } from "@/constants";

export function ImageRemoveButton() {
  return (
    <View style={styles.container}>
      <X fill={color.g300} />
    </View>
  );
}
