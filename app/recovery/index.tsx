// components
import { RecoveryPage } from "@/pages/Recovery";

// hooks
import { useThrowMainIfLogin, usePreventTabScrolling } from "@/hooks";

export default function Recovery() {
  useThrowMainIfLogin();
  usePreventTabScrolling();

  return <RecoveryPage />;
}
