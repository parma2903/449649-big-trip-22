import {FilterType} from '../const';
import {isPast, isPresent, isFuture} from './point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTo)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresent(point.dateFrom, point.dateTo)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateFrom)),
};

export {filter};
