// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function NoticeItemSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.toggler}>
        <View style={styles.buttonWrapper}>
          <View style={styles.button}>
            <SView style={{ width: 180, height: 24 }} />
            <SView style={{ width: 24, height: 24 }} />
          </View>
        </View>
      </View>
    </View>
  );
}
