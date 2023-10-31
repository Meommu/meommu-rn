import { useDispatch } from "react-redux";
import { changeVisible, changeMessage } from "@/store/modules/toast";

export function useToast() {
  const dispatch = useDispatch();

  const fireToast = (message: string, duration: number) => {
    dispatch(changeMessage(message));
    dispatch(changeVisible(true));

    setTimeout(() => {
      dispatch(changeVisible(false));
    }, duration);
  };

  return { fireToast };
}
