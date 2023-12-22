import { Price, OFFER_TYPES } from '../const.js';
import { getRandomPositiveNumber } from '../utils.js';

const generateOffer = () => {
  return {
    title: OFFER_TYPES[getRandomPositiveNumber(0, OFFER_TYPES.length - 1)],
    price: getRandomPositiveNumber(Price.MIN, Price.MAX / 10)
  };
};

const generateOffers = () => Array.from({ length: getRandomPositiveNumber(0, 5) }, generateOffer);

export { generateOffers };
