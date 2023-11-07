import { combineReducers } from "redux";

import toast from "./modules/toast";
import diaryDate from "./modules/diaryDate";

const rootReducer = combineReducers({
  toast,
  diaryDate,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
