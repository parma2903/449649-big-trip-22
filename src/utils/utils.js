import dayjs from 'dayjs';

const formatDate = (date) => date ? dayjs(date).format('MMM DD') : '';
const formatTime = (date) => date ? dayjs(date).format('HH:mm') : '';
const getTimeDiff = (dateFrom, dateTo) => dayjs(dateTo).diff(dateFrom, 'minute');
const getRandomPositiveNumber = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

function sortTime(eventA, eventB) {
  const eventADuration = getEventDuration(eventA);
  const eventBDuration = getEventDuration(eventB);

  return eventBDuration - eventADuration;
}

function getEventDuration(event) {
  return dayjs(event.dateTo).diff(dayjs(event.dateFrom));
}

function sortPrice(eventB, eventA) {
  return eventA.basePrice - eventB.basePrice;
}

const DateFormat = {
  DATE_PICKER: 'd/m/y H:i',
  DAY_MONTH: 'D MMM',
  MONTH_DAY: 'MMM DD',
  HOUR_MINUTES: 'HH:mm',
  DAY_MONTH_YEAR: 'DD/MM/YY[&nbsp;]HH:mm',
  MINUTES_WITH_POSTFIX: 'mm[M]',
  HOUR_MINUTES_WITH_POSTFIX: 'HH[H] mm[M]',
};

const DATE_CONFIG = {
  dateFormat: DateFormat.DATE_PICKER,
  enableTime: true,
  'time_24hr': true,
  locale: { firstDayOfWeek: 1 },
  allowInput: true
};

export { formatDate, formatTime, getTimeDiff, getRandomPositiveNumber, updateItem, sortTime, sortPrice, DATE_CONFIG };
