// components
import { WritePage } from "@/pages/Write";

// hooks
import { usePreventTabScrolling } from "@/hooks";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

export default function Write() {
  usePreventTabScrolling();

  return (
    <ResponsiveKeyboardAvoidingView>
      <WritePage />
    </ResponsiveKeyboardAvoidingView>
  );
}
