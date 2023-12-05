const enum UPDATE_LAYOUT_INFO {
  CHANGE_LAYOUT_WIDTH = "CHANGE_LAYOUT_WIDTH",
}

export const changeLayoutWidth = (width: number) => ({
  type: UPDATE_LAYOUT_INFO.CHANGE_LAYOUT_WIDTH,
  width,
});

export interface LayoutState {
  width: number;
}

interface LayoutAction {
  type: UPDATE_LAYOUT_INFO;
  width: number;
}

const initialState = {
  width: 0,
};

const layout = (
  state: LayoutState = initialState,
  action: LayoutAction
): LayoutState => {
  const { type, width } = action;

  switch (type) {
    case UPDATE_LAYOUT_INFO.CHANGE_LAYOUT_WIDTH: {
      return { ...state, width };
    }
    default: {
      return state;
    }
  }
};

export default layout;
