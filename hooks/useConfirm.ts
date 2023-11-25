// redux
import { useDispatch } from "react-redux";
import { changeContent, changeVisible } from "@/store/modules/confirm";

export const useConfirm = () => {
  const dispatch = useDispatch();

  const openConfirm = (
    title: string,
    body: string,
    okCallback: () => void,
    okMessage = "확인",
    cancelMessage = "취소"
  ) => {
    dispatch(changeContent(title, body, okCallback, okMessage, cancelMessage));
    dispatch(changeVisible(true));
  };

  return {
    openConfirm,
  };
};
