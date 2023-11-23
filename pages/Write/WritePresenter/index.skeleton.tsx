// react
import { View } from "react-native";

// components
import { Header } from "@/components/Layout/Header";
import { SView } from "@/components/Layout/SView";
import { WriteFormStepOneSkeleton } from "./WriteForm/WriteFormStepOne/index.skeleton";

// constants
import { size } from "@/constants";

// styles
import { styles } from "./index.styles";

export function WritePresenterSkeleton() {
  return (
    <View style={styles.container}>
      <Header
        style={styles.header}
        title={<SView style={{ width: 176, height: 24 }} />}
        left={
          <View style={{ width: 40, height: 40, padding: 8 }}>
            <SView style={{ width: "100%", height: "100%" }} />
          </View>
        }
      />

      <WriteFormStepOneSkeleton />

      <View style={styles.bottomButtonWrapper}>
        <SView
          style={{ width: "100%", height: size.NAVIGATION_BUTTON_HEIGHT }}
        />
      </View>
    </View>
  );
}
