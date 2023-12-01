// components
import { SignUpPage } from "@/pages/SignUp";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

// hooks
import { useThrowMainIfLogin, usePreventTabScrolling } from "@/hooks";

export default function SignUp() {
  useThrowMainIfLogin();
  usePreventTabScrolling();

  return (
    <ResponsiveKeyboardAvoidingView>
      <SignUpPage />
    </ResponsiveKeyboardAvoidingView>
  );
}
