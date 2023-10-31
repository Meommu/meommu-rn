const enum UPDATE_TOAST {
  CHANGE_MESSAGE = "CHANGE_MESSAGE",
  CHANGE_VISIBLE = "CHANGE_VISIBLE",
}

export const changeMessage = (message: string) => ({
  type: UPDATE_TOAST.CHANGE_MESSAGE,
  message,
});

export const changeVisible = (isOpen: boolean) => ({
  type: UPDATE_TOAST.CHANGE_VISIBLE,
  isOpen,
});

export interface ToastState {
  isOpen: boolean;
  message: string;
}

interface ToastAction {
  type: UPDATE_TOAST;
  isOpen: boolean;
  message: string;
}

const initialState = {
  isOpen: false,
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
      return { ...state, isOpen: action.isOpen };
    }
    default: {
      return state;
    }
  }
};

export default toast;
