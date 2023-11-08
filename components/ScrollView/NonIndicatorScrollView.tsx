// react
import { ScrollView } from "react-native";
import type { ScrollViewProps } from "react-native";

export function NonIndicatorScrollView({
  children,
  ...props
}: ScrollViewProps) {
  return (
    <ScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
