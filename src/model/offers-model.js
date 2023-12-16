import { getOffers } from '../mock/offers.js';

export default class OffersModel {
  constructor() {
    this.offers = getOffers();
  }

  get() {
    return this.offers;
  }

  getByType(type) {
    return this.offers.find((offers) => offers.type === type.toLowerCase()).offers;
  }
}
