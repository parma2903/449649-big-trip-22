import { getRandomEventPoint } from '../mock/event-points.js';

import { POINTS_COUNT } from '../const.js';

export default class PointsModel {
  points = Array.from({
    length: POINTS_COUNT
  }, getRandomEventPoint);

  getEventPoints() {
    return this.points;
  }
}
