// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function ProfileCardSkeleton() {
  return (
    <View style={styles.container}>
      <View style={styles.profileImage}>
        <View style={styles.profileImagePlaceholder}>
          <SView style={{ width: "100%", height: "100%" }} />
        </View>
      </View>

      <View style={styles.profileContent}>
        <SView style={{ width: 80, height: 21 }} />
        <SView style={{ width: 115, height: 14 }} />
      </View>
    </View>
  );
}
