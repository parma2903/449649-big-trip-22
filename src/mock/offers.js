import { MAX_PRICE_VALUE } from '../const.js';
import { getRandomPositiveNumber } from '../utils.js';

const mockOffers = [{
  type: 'taxi',
  offers: [{
    id: '1',
    title: 'Upgrade to a business class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Drive slowly',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'bus',
  offers: [{
    id: '1',
    title: 'Order meal',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'train',
  offers: [{
    id: '1',
    title: 'Book a taxi at the arrival point',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'flight',
  offers: [{
    id: '1',
    title: 'Choose meal',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose seats',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'check-in',
  offers: [{
    id: '1',
    title: 'Choose the time of check-in',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose the time of check-out',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'sightseeing',
  offers: []
}, {
  type: 'ship',
  offers: [{
    id: '1',
    title: 'Upgrade to comfort class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Upgrade to business class',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'drive',
  offers: [{
    id: '1',
    title: 'With automatic transmission',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'With air conditioning',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}, {
  type: 'restaurant',
  offers: [{
    id: '1',
    title: 'Choose live music',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }, {
    id: '2',
    title: 'Choose VIP area',
    price: getRandomPositiveNumber(MAX_PRICE_VALUE),
  }]
}];

const getOffers = () => mockOffers;

export { getOffers };
