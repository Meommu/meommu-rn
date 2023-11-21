import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";
import bottomSheetRef from "./modules/bottomSheetRef";

const rootReducer = combineReducers({
  toast,
  diaryDate,
  bottomSheetRef,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
