import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";
import bottomSheet from "./modules/bottomSheet";
import confirm from "./modules/confirm";

const rootReducer = combineReducers({
  toast,
  diaryDate,
  bottomSheet,
  confirm,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
