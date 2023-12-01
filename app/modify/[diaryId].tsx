// components
import { ModifyPage } from "@/pages/Write";

// hooks
import { usePreventTabScrolling } from "@/hooks";

export default function Modify() {
  usePreventTabScrolling();

  return <ModifyPage />;
}
