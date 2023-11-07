export const getPastYearDate = (yearCount: number) => {
  const now = new Date();

  return new Date(now.setFullYear(now.getFullYear() - yearCount));
};
