// react
import { MutableRefObject } from "react";

// bottom sheet
import BottomSheet from "@gorhom/bottom-sheet";

const enum UPDATE_BOTTOM_SHEET_REFS {
  SET_WRITE_GUIDE_BOTTOM_SHEET_REF = "SET_WRITE_GUIDE_BOTTOM_SHEET_REF",
  SET_DATE_PICKER_BOTTOM_SHEET_REF = "SET_DATE_PICKER_BOTTOM_SHEET_REF",
}

export const updateWriteGuideBottomSheetRef = (
  bottomSheetRef: MutableRefObject<BottomSheet | null>
) => ({
  type: UPDATE_BOTTOM_SHEET_REFS.SET_WRITE_GUIDE_BOTTOM_SHEET_REF,
  bottomSheetRef,
});

export const updateDatePickerBottomSheetRef = (
  bottomSheetRef: MutableRefObject<BottomSheet | null>
) => ({
  type: UPDATE_BOTTOM_SHEET_REFS.SET_DATE_PICKER_BOTTOM_SHEET_REF,
  bottomSheetRef,
});

export interface BottomSheetState {
  writeGuideBottomSheetRef: MutableRefObject<BottomSheet | null> | null;
  datePickerBottomSheetRef: MutableRefObject<BottomSheet | null> | null;
}

interface BottomSheetAction {
  type: UPDATE_BOTTOM_SHEET_REFS;
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
}

const initialState = {
  isOpen: false,
  writeGuideBottomSheetRef: null,
  datePickerBottomSheetRef: null,
};

const bottomSheet = (
  state: BottomSheetState = initialState,
  action: BottomSheetAction
): BottomSheetState => {
  const { type, bottomSheetRef } = action;

  switch (type) {
    case UPDATE_BOTTOM_SHEET_REFS.SET_DATE_PICKER_BOTTOM_SHEET_REF: {
      return { ...state, datePickerBottomSheetRef: bottomSheetRef };
    }
    case UPDATE_BOTTOM_SHEET_REFS.SET_WRITE_GUIDE_BOTTOM_SHEET_REF: {
      return { ...state, writeGuideBottomSheetRef: bottomSheetRef };
    }
    default: {
      return state;
    }
  }
};

export default bottomSheet;
