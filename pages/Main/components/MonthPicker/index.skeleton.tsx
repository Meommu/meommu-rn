// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function MonthPickerSkeleton() {
  return (
    <View style={styles.container}>
      <SView style={[styles.content, { width: 100, height: 24 }]} />
    </View>
  );
}
