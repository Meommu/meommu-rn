import React, { createContext } from "react";

type MonthCalendarContextValue = {
  currentYear: number;
  currentMonth: number;
  yearMonthToImageId: Map<string, number>;
  setCurrentYearMonth: (year: number, month: number) => void;
};

const MonthCalendarContext = createContext<MonthCalendarContextValue>({
  currentYear: new Date().getFullYear(),
  currentMonth: new Date().getMonth() + 1,
  yearMonthToImageId: new Map(),
  setCurrentYearMonth: (year: number, month: number) => {},
});

interface MonthCalendarProvider {
  value: MonthCalendarContextValue;
  children: React.ReactNode;
}

function MonthCalendarProvider({ value, children }: MonthCalendarProvider) {
  return (
    <MonthCalendarContext.Provider value={value}>
      {children}
    </MonthCalendarContext.Provider>
  );
}

export { MonthCalendarProvider, MonthCalendarContext };
