// components
import { ModifyPage } from "@/pages/Write";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

// hooks
import { usePreventTabScrolling } from "@/hooks";

export default function Modify() {
  usePreventTabScrolling();

  return (
    <ResponsiveKeyboardAvoidingView>
      <ModifyPage />
    </ResponsiveKeyboardAvoidingView>
  );
}
