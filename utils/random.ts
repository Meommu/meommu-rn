export const createRandomNumberInRange = (from: number, to: number) => {
  if (from > to) {
    [from, to] = [to, from];
  }

  return Math.floor(Math.random() * (to - from + 1)) + from;
};
