import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";
import bottomSheet from "./modules/bottomSheet";
import confirm from "./modules/confirm";
import layout from "./modules/layout";

const rootReducer = combineReducers({
  toast,
  diaryDate,
  bottomSheet,
  confirm,
  layout,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
