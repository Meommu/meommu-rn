// components
import { SignUpPage } from "@/pages/SignUp";

// hooks
import { useThrowMainIfLogin, usePreventTabScrolling } from "@/hooks";

export default function SignUp() {
  useThrowMainIfLogin();
  usePreventTabScrolling();

  return <SignUpPage />;
}
