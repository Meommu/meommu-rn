// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function DiaryItemSkeleton() {
  return (
    <View style={styles.container}>
      <SView style={[styles.imageSliderWrapper, { aspectRatio: "1/1" }]} />

      <View style={styles.diaryBodyWrapper}>
        <View style={styles.diaryBody}>
          <SView style={{ width: "60%", height: 32 }} />
          <SView style={{ width: "100%", height: 50 }} />
          <SView style={{ width: 110, height: 17 }} />
        </View>
      </View>
    </View>
  );
}
