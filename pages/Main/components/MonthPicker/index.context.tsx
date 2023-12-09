import React, { createContext } from "react";

type MonthPickerContextValue = {
  currentYear: number;
  currentMonth: number;
  yearMonthToImageId: Map<string, number>;
  setCurrentYearMonth: (year: number, month: number) => void;
};

const MonthPickerContext = createContext<MonthPickerContextValue>({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  yearMonthToImageId: new Map(),
  setCurrentYearMonth: (year: number, month: number) => {},
});

interface MonthPickerProvider {
  value: MonthPickerContextValue;
  children: React.ReactNode;
}

function MonthPickerProvider({ value, children }: MonthPickerProvider) {
  return (
    <MonthPickerContext.Provider value={value}>
      {children}
    </MonthPickerContext.Provider>
  );
}

export { MonthPickerProvider, MonthPickerContext };
