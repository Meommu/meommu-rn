// react
import { MutableRefObject } from "react";

// bottom sheet
import BottomSheet from "@gorhom/bottom-sheet";

const enum UPDATE_AI_BOTTOM_SHEET {
  SET_AI_BOTTOM_SHEET_REF = "SET_AI_BOTTOM_SHEET_REF",
  SET_AI_BOTTOM_SHEET_IS_OPEN = "SET_AI_BOTTOM_SHEET_IS_OPEN",
}

export const shareAiBottomSheetRef = (
  bottomSheetRef: MutableRefObject<BottomSheet | null>
) => ({
  type: UPDATE_AI_BOTTOM_SHEET.SET_AI_BOTTOM_SHEET_REF,
  bottomSheetRef,
});

export const changeAiBottomSheetIsOpen = (isOpen: boolean) => ({
  type: UPDATE_AI_BOTTOM_SHEET.SET_AI_BOTTOM_SHEET_IS_OPEN,
  isOpen,
});

/**
 * ※ 현재 isOpen 상태는 사용되고 있지 않음. (추후 삭제 될 예정)
 */
export interface AiBottomSheetState {
  isOpen: boolean;
  bottomSheetRef: MutableRefObject<BottomSheet | null> | null;
}

interface AiBottomSheetAction {
  type: UPDATE_AI_BOTTOM_SHEET;
  isOpen: boolean;
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
}

const initialState = {
  isOpen: false,
  bottomSheetRef: null,
};

const aiBottomSheetRef = (
  state: AiBottomSheetState = initialState,
  action: AiBottomSheetAction
): AiBottomSheetState => {
  const { type, bottomSheetRef, isOpen } = action;

  switch (type) {
    case UPDATE_AI_BOTTOM_SHEET.SET_AI_BOTTOM_SHEET_REF: {
      return { ...state, bottomSheetRef };
    }
    case UPDATE_AI_BOTTOM_SHEET.SET_AI_BOTTOM_SHEET_IS_OPEN: {
      return { ...state, isOpen };
    }
    default: {
      return state;
    }
  }
};

export default aiBottomSheetRef;
