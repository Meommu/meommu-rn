// react
import { StyleSheet } from "react-native";

// components
import { ModifyPage } from "@/pages/Write";
import { KView } from "@/components/Layout/KView";

// hooks
import { usePreventTabScrolling } from "@/hooks";

export default function Modify() {
  usePreventTabScrolling();

  return (
    <KView style={styles.container}>
      <ModifyPage />
    </KView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
