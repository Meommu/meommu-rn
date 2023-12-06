// react
import { ScrollView, type ScrollViewProps } from "react-native";

export function NonIndicatorScrollView({
  children,
  ...props
}: ScrollViewProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
