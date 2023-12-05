import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";
import aiBottomSheet from "./modules/aiBottomSheet";
import confirm from "./modules/confirm";
import layout from "./modules/layout";

const rootReducer = combineReducers({
  toast,
  diaryDate,
  aiBottomSheet,
  confirm,
  layout,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
