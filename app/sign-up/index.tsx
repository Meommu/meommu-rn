// react
import { StyleSheet } from "react-native";

// components
import { KView } from "@/components/Layout/KView";
import { SignUpPage } from "@/pages/SignUp";

// hooks
import { useThrowMainIfLogin, usePreventTabScrolling } from "@/hooks";

export default function SignUp() {
  useThrowMainIfLogin();
  usePreventTabScrolling();

  return (
    <KView style={styles.container}>
      <SignUpPage />
    </KView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
