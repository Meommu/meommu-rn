import React, { createContext } from "react";

type DatePickerContextValue = {
  year: number;
  month: number;
  date: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
  setDate: (date: number) => void;
  dateToImageId: Map<string, number>;
};

const DatePickerContext = createContext<DatePickerContextValue>({
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  date: new Date().getDate(),
  setYear: (year: number) => {},
  setMonth: (month: number) => {},
  setDate: (date: number) => {},
  dateToImageId: new Map(),
});

interface DatePickerProvider {
  value: DatePickerContextValue;
  children: React.ReactNode;
}

function DatePickerProvider({ value, children }: DatePickerProvider) {
  return (
    <DatePickerContext.Provider value={value}>
      {children}
    </DatePickerContext.Provider>
  );
}

export { DatePickerProvider, DatePickerContext };
