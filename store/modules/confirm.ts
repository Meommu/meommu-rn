const enum UPDATE_CONFIRM {
  CHANGE_CONTENT = "CHANGE_CONTENT",
  CHANGE_VISIBLE = "CHANGE_VISIBLE",
}

export const changeContent = (
  title: string,
  body: string,
  okCallback: () => void,
  okMessage: string = "확인",
  cancelMessage: string = "취소"
) => ({
  type: UPDATE_CONFIRM.CHANGE_CONTENT,
  title,
  body,
  okCallback,
  okMessage,
  cancelMessage,
});

export const changeVisible = (isConfirmOpen: boolean) => ({
  type: UPDATE_CONFIRM.CHANGE_VISIBLE,
  isConfirmOpen,
});

export interface ConfirmState {
  isConfirmOpen: boolean;
  title: string;
  body: string;
  button: {
    ok: {
      message: string;
      callback: () => void;
    };
    cancel: {
      message: string;
    };
  };
}

interface ConfirmAction {
  type: UPDATE_CONFIRM;
  isConfirmOpen: boolean;
  title: string;
  body: string;
  okCallback: () => void;
  okMessage: string;
  cancelMessage: string;
}

const initialState = {
  isConfirmOpen: false,
  title: "",
  body: "",
  button: {
    ok: {
      message: "",
      callback: () => {},
    },
    cancel: {
      message: "",
    },
  },
};

const confirm = (
  state: ConfirmState = initialState,
  action: ConfirmAction
): ConfirmState => {
  const {
    type,
    isConfirmOpen,
    title,
    body,
    okCallback,
    okMessage,
    cancelMessage,
  } = action;

  switch (type) {
    case UPDATE_CONFIRM.CHANGE_CONTENT: {
      return {
        ...state,
        title,
        body,
        button: {
          ok: {
            message: okMessage,
            callback: okCallback,
          },
          cancel: {
            message: cancelMessage,
          },
        },
      };
    }
    case UPDATE_CONFIRM.CHANGE_VISIBLE: {
      return { ...state, isConfirmOpen };
    }
    default: {
      return state;
    }
  }
};

export default confirm;
