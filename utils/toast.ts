import { changeVisible, changeMessage } from "@/store/modules/toast";
import type { Dispatch } from "redux";

export const fireToast = (
  dispatch: Dispatch,
  message: string,
  duration: number
) => {
  dispatch(changeMessage(message));
  dispatch(changeVisible(true));

  setTimeout(() => {
    dispatch(changeVisible(false));
  }, duration);
};
