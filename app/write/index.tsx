// components
import { WritePage } from "@/pages/Write";

// hooks
import { usePreventTabScrolling } from "@/hooks";

export default function Write() {
  usePreventTabScrolling();

  return <WritePage />;
}
