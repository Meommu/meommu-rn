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

export function DiarySkeleton() {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        left={<SView style={{ width: 24, height: 24, margin: 8 }} />}
        right={<SView style={{ width: 24, height: 24, margin: 8 }} />}
      />

      <NonIndicatorScrollView>
        <SView style={{ width: "100%", aspectRatio: "3/4", borderRadius: 0 }} />

        <View style={styles.body}>
          <View style={styles.bodyTitleLayout}>
            <View style={styles.bodyTitle}>
              <SView style={{ width: "70%", height: 40 }} />
            </View>

            <SView style={{ width: 32, height: 32 }} />
          </View>

          <SView style={{ width: "40%", height: 22 }} />
          <SView style={{ width: "100%", height: 300 }} />
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
