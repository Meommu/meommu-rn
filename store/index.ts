import { combineReducers } from "redux";
import toast from "./modules/toast";

const rootReducer = combineReducers({
  toast,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
