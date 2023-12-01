// components
import { RecoveryPage } from "@/pages/Recovery";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

// hooks
import { useThrowMainIfLogin, usePreventTabScrolling } from "@/hooks";

export default function Recovery() {
  useThrowMainIfLogin();
  usePreventTabScrolling();

  return (
    <ResponsiveKeyboardAvoidingView>
      <RecoveryPage />
    </ResponsiveKeyboardAvoidingView>
  );
}
