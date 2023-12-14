// react
import { View, type ViewProps } from "react-native";

export function FixedRelativeView({ children, style, ...props }: ViewProps) {
  return (
    <View style={[style, { transform: "rotate(0)" }]} {...props}>
      {children}
    </View>
  );
}
