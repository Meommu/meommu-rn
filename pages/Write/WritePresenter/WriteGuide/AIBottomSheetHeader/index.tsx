// react
import { View, Text } from "react-native";

// style
import { styles } from "./index.styles";

interface AIBottomSheetHeaderProps {
  title?: string;
  subTitle?: string;
}

export function AIBottomSheetHeader({
  title = "멈무일기 가이드",
  subTitle = "오늘은 어떤 낮잠 이었나요?",
}: AIBottomSheetHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}
