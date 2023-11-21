// react
import React from "react";

// redux
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "@/store";

export const store = createStore(rootReducer);

interface ReduxStoreProps {
  children: React.ReactNode;
}

export function ReduxStore({ children }: ReduxStoreProps) {
  return <Provider store={store}>{children}</Provider>;
}
