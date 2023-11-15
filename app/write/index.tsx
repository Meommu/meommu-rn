// react
import { StyleSheet } from "react-native";

// components
import { WritePage } from "@/pages/Write";
import { KView } from "@/components/Layout/KView";

// hooks
import { usePreventTabScrolling } from "@/hooks";

export default function Write() {
  usePreventTabScrolling();

  return (
    <KView style={styles.container}>
      <WritePage />
    </KView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
