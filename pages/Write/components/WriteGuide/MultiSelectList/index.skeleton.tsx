// react
import { View } from "react-native";

// components
import { SView } from "@/components/Layout/SView";

// styles
import { styles } from "./index.styles";

export function MultiSelectListSkeleton() {
  return (
    <View style={styles.list}>
      {Array(5)
        .fill(null)
        .map((_, i) => {
          return (
            <SView
              key={i}
              style={[styles.item, { backgroundColor: "rgb(54, 60, 72)" }]}
            />
          );
        })}
    </View>
  );
}
