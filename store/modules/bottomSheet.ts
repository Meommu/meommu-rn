// react
import { MutableRefObject } from "react";

// bottom sheet
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";

const enum UPDATE_BOTTOM_SHEET_REFS {
  SET_WRITE_GUIDE_BOTTOM_SHEET_REF = "SET_WRITE_GUIDE_BOTTOM_SHEET_REF",
  SET_DATE_PICKER_BOTTOM_SHEET_REF = "SET_DATE_PICKER_BOTTOM_SHEET_REF",
  SET_MONTH_PICKER_BOTTOM_SHEET_MODAL_REF = "SET_MONTH_PICKER_BOTTOM_SHEET_MODAL_REF",
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

export const updateMonthPickerBottomSheetModalRef = (
  bottomSheetModalRef: MutableRefObject<BottomSheetModal | null>
) => ({
  type: UPDATE_BOTTOM_SHEET_REFS.SET_MONTH_PICKER_BOTTOM_SHEET_MODAL_REF,
  bottomSheetModalRef,
});

export interface BottomSheetState {
  writeGuideBottomSheetRef: MutableRefObject<BottomSheet | null> | null;
  datePickerBottomSheetRef: MutableRefObject<BottomSheet | null> | null;
  monthPickerBottomSheetRef: MutableRefObject<BottomSheetModal | null> | null;
}

interface BottomSheetAction {
  type: UPDATE_BOTTOM_SHEET_REFS;
  bottomSheetRef: MutableRefObject<BottomSheet | null>;
  bottomSheetModalRef: MutableRefObject<BottomSheetModal | null>;
}

const initialState = {
  isOpen: false,
  writeGuideBottomSheetRef: null,
  datePickerBottomSheetRef: null,
  monthPickerBottomSheetRef: null,
};

const bottomSheet = (
  state: BottomSheetState = initialState,
  action: BottomSheetAction
): BottomSheetState => {
  const { type, bottomSheetRef, bottomSheetModalRef } = action;

  switch (type) {
    case UPDATE_BOTTOM_SHEET_REFS.SET_DATE_PICKER_BOTTOM_SHEET_REF: {
      return { ...state, datePickerBottomSheetRef: bottomSheetRef };
    }
    case UPDATE_BOTTOM_SHEET_REFS.SET_WRITE_GUIDE_BOTTOM_SHEET_REF: {
      return { ...state, writeGuideBottomSheetRef: bottomSheetRef };
    }
    case UPDATE_BOTTOM_SHEET_REFS.SET_MONTH_PICKER_BOTTOM_SHEET_MODAL_REF: {
      return { ...state, monthPickerBottomSheetRef: bottomSheetModalRef };
    }
    default: {
      return state;
    }
  }
};

export default bottomSheet;
