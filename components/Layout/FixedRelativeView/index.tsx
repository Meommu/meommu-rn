// react
import { View, type ViewProps } from "react-native";

// styles
import { styles } from "./index.styles";

export function FixedRelativeView({ children, style, ...props }: ViewProps) {
  return (
    <View style={[style, styles.container]} {...props}>
      {children}
    </View>
  );
}
