// components
import { HomePage } from "@/pages/Home";
import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";

// hooks
import { useThrowMainIfLogin } from "@/hooks";

export default function Home() {
  useThrowMainIfLogin();

  return (
    <ResponsiveKeyboardAvoidingView>
      <HomePage />
    </ResponsiveKeyboardAvoidingView>
  );
}
