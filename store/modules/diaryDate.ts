const enum UPDATE_DIARY_DATE {
  CHANGE_SELECTED_YEAR_MONTH = "CHANGE_SELECTED_YEAR_MONTH",
}

export const changeSelectedYearMonth = (year: number, month: number) => ({
  type: UPDATE_DIARY_DATE.CHANGE_SELECTED_YEAR_MONTH,
  year,
  month,
});

export interface DiaryDateState {
  selectedYear: number;
  selectedMonth: number;
}

interface DiaryDateAction {
  type: UPDATE_DIARY_DATE;
  year: number;
  month: number;
}

const initialState = {
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth() + 1,
};

const diaryDate = (
  state: DiaryDateState = initialState,
  action: DiaryDateAction
): DiaryDateState => {
  const { type, year, month } = action;

  switch (type) {
    case UPDATE_DIARY_DATE.CHANGE_SELECTED_YEAR_MONTH: {
      return { ...state, selectedYear: year, selectedMonth: month };
    }
    default: {
      return state;
    }
  }
};

export default diaryDate;
