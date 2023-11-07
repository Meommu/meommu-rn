const enum UPDATE_DIARY_DATE {
  CHANGE_CURRENT_YEAR_MONTH = "CHANGE_CURRENT_YEAR_MONTH",
  CHANGE_SELECTED_YEAR_MONTH = "CHANGE_SELECTED_YEAR_MONTH",
  APPLY_CURRENT_DATE_BY_SELECTED = "APPLY_CURRENT_DATE_BY_SELECTED",
  UPDATE_DIARIES_THUMBNAIL_IMAGE = "UPDATE_DIARIES_THUMBNAIL_IMAGE",
}

export const changeCurrentYearMonth = (year: number, month: number) => ({
  type: UPDATE_DIARY_DATE.CHANGE_CURRENT_YEAR_MONTH,
  year,
  month,
});

export const changeSelectedYearMonth = (year: number, month: number) => ({
  type: UPDATE_DIARY_DATE.CHANGE_SELECTED_YEAR_MONTH,
  year,
  month,
});

export const applyCurrentBySelected = () => ({
  type: UPDATE_DIARY_DATE.APPLY_CURRENT_DATE_BY_SELECTED,
});

export const updateDiariesThumbnailImage = (
  yearMonthToImageId: Map<string, number>
) => ({
  type: UPDATE_DIARY_DATE.UPDATE_DIARIES_THUMBNAIL_IMAGE,
  yearMonthToImageId,
});

export interface DiaryDateState {
  currentYear: number;
  currentMonth: number;
  selectedYear: number;
  selectedMonth: number;
  yearMonthToImageId: Map<string, number>;
}

interface DiaryDateAction {
  type: UPDATE_DIARY_DATE;
  year: number;
  month: number;
  yearMonthToImageId: Map<string, number>;
}

const initialState = {
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,
  yearMonthToImageId: new Map(),
};

const diaryDate = (
  state: DiaryDateState = initialState,
  action: DiaryDateAction
): DiaryDateState => {
  const { type, year, month, yearMonthToImageId } = action;

  switch (type) {
    case UPDATE_DIARY_DATE.CHANGE_CURRENT_YEAR_MONTH: {
      return { ...state, currentYear: year, currentMonth: month };
    }
    case UPDATE_DIARY_DATE.CHANGE_SELECTED_YEAR_MONTH: {
      return { ...state, selectedYear: year, selectedMonth: month };
    }
    case UPDATE_DIARY_DATE.APPLY_CURRENT_DATE_BY_SELECTED: {
      const { selectedMonth, selectedYear } = state;

      return {
        ...state,
        currentYear: selectedYear,
        currentMonth: selectedMonth,
      };
    }
    case UPDATE_DIARY_DATE.UPDATE_DIARIES_THUMBNAIL_IMAGE: {
      return { ...state, yearMonthToImageId };
    }
    default: {
      return state;
    }
  }
};

export default diaryDate;
