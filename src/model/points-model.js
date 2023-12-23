import { generatePoint } from '../mock/points.js';
import { getRandomPositiveNumber } from '../utils.js';

const POINTS_COUNT = getRandomPositiveNumber(0, 5);

export default class PointsModel {
  #points = Array.from({ length: POINTS_COUNT }, generatePoint);

  get points() {
    return this.#points;
  }
}
