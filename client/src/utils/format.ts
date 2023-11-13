import dayjs from 'dayjs';

export const formatDate = (date: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).format('DD.MM.YYYY');
};

export const formatTime = (date: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).format('HH:mm:ss');
};

export const formatSign = (value: number) => {
  return `${value > 0 ? '+' : ''}${value}`;
};
