export default class PointsModel {
  constructor(service) {
    this.service = service;
    this.points = this.service.getPoints();
  }

  getPoints() {
    return this.points;
  }
}
