const enum UPDATE_TOAST {
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  CHANGE_VISIBLE = "CHANGE_VISIBLE",
}

export const changeMessage = (message: string) => ({
  type: UPDATE_TOAST.CHANGE_MESSAGE,
  message,
});

export const changeVisible = (isToastOpen: boolean) => ({
  type: UPDATE_TOAST.CHANGE_VISIBLE,
  isToastOpen,
});

export interface ToastState {
  isToastOpen: boolean;
  message: string;
}

interface ToastAction {
  type: UPDATE_TOAST;
  isToastOpen: boolean;
  message: string;
}

const initialState = {
  isToastOpen: false,
  message: "",
};

const toast = (
  state: ToastState = initialState,
  action: ToastAction
): ToastState => {
  switch (action.type) {
    case UPDATE_TOAST.CHANGE_MESSAGE: {
      return { ...state, message: action.message };
    }
    case UPDATE_TOAST.CHANGE_VISIBLE: {
      return { ...state, isToastOpen: action.isToastOpen };
    }
    default: {
      return state;
    }
  }
};

export default toast;
