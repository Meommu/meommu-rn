// redux
import { useDispatch } from "react-redux";
import { changeContent, changeVisible } from "@/store/modules/confirm";
import { type ConfirmContentState } from "@/store/modules/confirm";

export const useConfirm = () => {
  const dispatch = useDispatch();

  const openConfirm = (content: ConfirmContentState) => {
    dispatch(changeContent(content));
    dispatch(changeVisible(true));
  };

  return {
    openConfirm,
  };
};
