export const getPastYearDate = (yearCount: number) => {
  const now = new Date();

  return new Date(now.setFullYear(now.getFullYear() - yearCount));
};

export const createYearMonthKey = (date: Date) => {
  const year = date.getFullYear();

  const month = date.getMonth() + 1;

  return `${year}|${month}`;
};
