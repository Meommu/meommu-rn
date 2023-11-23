// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function WriteFormStepOneSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <SView
            style={[styles.dogImageBox, { backgroundColor: "lightgray" }]}
          />

          <SView style={[styles.dogNameInputWrapper, { height: 29 }]} />
        </View>
      </View>
    </View>
  );
}
