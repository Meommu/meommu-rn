// react
import { MutableRefObject } from "react";

// bottom sheet
import BottomSheet from "@gorhom/bottom-sheet";

const enum UPDATE_BOTTOM_SHEET_REF {
  SHARE_WRITE_GUIDE_BOTTOM_SHEET_REF = "SHARE_WRITE_GUIDE_BOTTOM_SHEET_REF",
}

export const shareWriteGuideButtonSheetRef = (
  bottomSheetRef: MutableRefObject<BottomSheet | null>
) => ({
  type: UPDATE_BOTTOM_SHEET_REF.SHARE_WRITE_GUIDE_BOTTOM_SHEET_REF,
  bottomSheetRef,
});

export interface BottomSheetRefState {
  writeGuideBottomSheetRef: MutableRefObject<BottomSheet | null> | null;
}

interface BottomSheetRefAction {
  type: UPDATE_BOTTOM_SHEET_REF;
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
}

const initialState = {
  writeGuideBottomSheetRef: null,
};

const bottomSheetRef = (
  state: BottomSheetRefState = initialState,
  action: BottomSheetRefAction
): BottomSheetRefState => {
  const { type, bottomSheetRef } = action;

  switch (type) {
    case UPDATE_BOTTOM_SHEET_REF.SHARE_WRITE_GUIDE_BOTTOM_SHEET_REF: {
      return { ...state, writeGuideBottomSheetRef: bottomSheetRef };
    }
    default: {
      return state;
    }
  }
};

export default bottomSheetRef;
