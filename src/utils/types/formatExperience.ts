export const getYearWord = (years: number): string => {
  if (years % 10 === 1 && years % 100 !== 11) return 'рік';
  if ([2, 3, 4].includes(years % 10) && ![12, 13, 14].includes(years % 100)) return 'роки';
  return 'років';
};