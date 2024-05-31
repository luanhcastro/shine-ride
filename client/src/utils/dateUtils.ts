import dayjs, { Dayjs } from 'dayjs';

export const getNextBusinessDay = (date: Dayjs) => {
  let nextBusinessDay = date;
  while (nextBusinessDay.day() === 6 || nextBusinessDay.day() === 0) {
    nextBusinessDay = nextBusinessDay.add(1, 'day');
  }
  return nextBusinessDay;
};
