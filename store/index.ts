import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";
import aiBottomSheet from "./modules/aiBottomSheet";

const rootReducer = combineReducers({
  toast,
  diaryDate,
  aiBottomSheet,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
