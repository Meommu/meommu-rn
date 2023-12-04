import { ResponsiveKeyboardAvoidingView } from "@/components/Layout/ResponsiveKeyboardAvoidingView";
import { ProfilePage } from "@/pages/Setting/Profile";

export default function Profile() {
  return (
    <ResponsiveKeyboardAvoidingView>
      <ProfilePage />
    </ResponsiveKeyboardAvoidingView>
  );
}
