/* eslint-disable no-plusplus */
export const score = (p: number, n: number): number => {
  if (p === 0 && n === 0) {
    return 0;
  }
  const r =
    ((p + 1.9208) / (p + n) -
      (1.96 * Math.sqrt((p * n) / (p + n) + 0.9604)) / (p + n)) /
    (1 + 3.8416 / (p + n));
  return Number(r.toFixed(2));
};

export const rate = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((acc, rating) => acc + rating, 0);

  return sum / ratings.length;
};

export const average = (ratings: number[]): number => {
  if (ratings.length === 0) {
    return 0;
  }

  const sum: number = ratings.reduce((acc, rating) => acc + rating, 0);
  const final = Number(sum / ratings.length).toFixed(1);

  return Number(final);
};
