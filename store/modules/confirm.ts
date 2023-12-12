const enum UPDATE_CONFIRM {
  CHANGE_CONFIRM_CONTENT = "CHANGE_CONFIRM_CONTENT",
  CHANGE_CONFIRM_VISIBLE = "CHANGE_CONFIRM_VISIBLE",
}

export interface ConfirmState {
  isConfirmOpen: boolean;

  title: string;
  body: string;
  button: {
    ok: {
      lock?: string;
      message: string;
      callback: () => void;
    };
    cancel: {
      message: string;
    };
  };
}

export type ConfirmContentState = Omit<ConfirmState, "isConfirmOpen">;

interface ConfirmAction {
  type: UPDATE_CONFIRM;

  isConfirmOpen: boolean;

  content: ConfirmContentState;
}

const initialState: ConfirmState = {
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

export const changeContent = (content: ConfirmContentState) => ({
  type: UPDATE_CONFIRM.CHANGE_CONFIRM_CONTENT,
  content,
});

export const changeVisible = (isConfirmOpen: boolean) => ({
  type: UPDATE_CONFIRM.CHANGE_CONFIRM_VISIBLE,
  isConfirmOpen,
});

const confirm = (
  state: ConfirmState = initialState,
  action: ConfirmAction
): ConfirmState => {
  const { type, isConfirmOpen, content } = action;

  switch (type) {
    case UPDATE_CONFIRM.CHANGE_CONFIRM_CONTENT: {
      return {
        ...state,
        ...content,
      };
    }
    case UPDATE_CONFIRM.CHANGE_CONFIRM_VISIBLE: {
      return { ...state, isConfirmOpen };
    }
    default: {
      return state;
    }
  }
};

export default confirm;
