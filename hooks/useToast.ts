// react
import { useRef } from "react";
import { useDispatch } from "react-redux";

// redux
import { changeVisible, changeMessage } from "@/store/modules/toast";

export function useToast() {
  const dispatch = useDispatch();

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fireToast = (message: string, duration: number) => {
    dispatch(changeMessage(message));
    dispatch(changeVisible(true));

    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      dispatch(changeVisible(false));
    }, duration);
  };

  return { fireToast };
}
