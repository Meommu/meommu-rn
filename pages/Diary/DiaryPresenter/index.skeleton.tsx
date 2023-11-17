// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";
import { Header } from "@/components/Layout/Header";
import { NonIndicatorScrollView } from "@/components/ScrollView/NonIndicatorScrollView";

// constants
import { size } from "@/constants";

// styles
import { styles } from "./index.styles";

interface DiaryPresenterSkeletonProps {
  isShared?: boolean;
}

export function DiaryPresenterSkeleton({
  isShared = false,
}: DiaryPresenterSkeletonProps) {
  return (
    <View style={styles.container}>
      {!isShared ? (
        <Header
          style={styles.header}
          left={<SView style={{ width: 24, height: 24, margin: 8 }} />}
          right={<SView style={{ width: 24, height: 24, margin: 8 }} />}
        />
      ) : (
        <Header
          style={[styles.header, { height: 64 }]}
          title={<SView style={[styles.header, { width: 100, height: 30 }]} />}
        />
      )}

      <NonIndicatorScrollView>
        <View style={styles.captureArea}>
          <SView
            style={{ width: "100%", aspectRatio: "3/4", borderRadius: 0 }}
          />

          <View style={styles.body}>
            <SView style={{ width: "50%", height: 32 }} />
            <SView style={{ width: "40%", height: 22 }} />
            <SView style={{ width: "100%", height: 300 }} />
          </View>
        </View>

        <View style={styles.bottomButtonWrapper}>
          <SView
            style={{ width: "100%", height: size.NAVIGATION_BUTTON_HEIGHT }}
          />
        </View>
      </NonIndicatorScrollView>
    </View>
  );
}
