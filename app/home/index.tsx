// components
import { HomePage } from "@/pages/Home";

// hooks
import { useThrowMainIfLogin } from "@/hooks";

export default function Home() {
  useThrowMainIfLogin();

  return <HomePage />;
}
