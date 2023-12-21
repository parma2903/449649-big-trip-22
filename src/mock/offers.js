import { Price } from '../const.js';
import { getRandomPositiveNumber } from '../utils.js';

const generateOffers = (type) => ({
  id: crypto.randomUUID(),
  title: `Offer ${type}`,
  price: getRandomPositiveNumber(Price.MIN, Price.MAX / 10),
});

export {
  generateOffers
};
