import dayjs from 'dayjs';
import { getRandomPositiveNumber } from '../utils/utils.js';
import { generateOffers } from './offers.js';
import { generateDestinations } from './destinations.js';

const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const generateDate = () => {
  const maxMinutesGap = getRandomPositiveNumber(0, 60 * 24);
  const minutesGap = getRandomPositiveNumber(-maxMinutesGap, maxMinutesGap);
  const dateFrom = dayjs().add(minutesGap, 'minute');
  const dateTo = dateFrom.add(getRandomPositiveNumber(20, 60), 'minute');

  return {
    dateFrom: dateFrom.toDate(),
    dateTo: dateTo.toDate(),
  };
};

const generatePoint = () => {
  const { dateFrom, dateTo } = generateDate();
  const type = POINT_TYPES[getRandomPositiveNumber(0, POINT_TYPES.length - 1)];
  return {
    basePrice: getRandomPositiveNumber(1, 50) * 10,
    dateFrom,
    dateTo,
    destination: generateDestinations(),
    id: getRandomPositiveNumber(1, 1000),
    type: type,
    offers: generateOffers(),
    isFavorite: Boolean(getRandomPositiveNumber(0, 1))
  };
};

export { generatePoint };
