import dayjs from 'dayjs';

function isPast(dateTo) {
  return dayjs().isAfter(dayjs(dateTo));
}

function isPresent(dateFrom, dateTo) {
  return (dayjs().isAfter(dayjs(dateFrom)) || dayjs().isSame(dayjs(dateFrom))) && (dayjs().isBefore(dayjs(dateTo)) || dayjs().isSame(dayjs(dateTo)));
}

function isFuture(dateFrom) {
  return dayjs().isBefore(dayjs(dateFrom));
}

export {isPast, isPresent, isFuture};
