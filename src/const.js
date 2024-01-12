const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const CITIES = ['Paris', 'London', 'Chicago', 'Tokio', 'New York', 'Moscow', 'Amsterdam', 'San-Francisco'];
const CITY_DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const PICTURE_DESCRIPTION = [
  'Nestled between rolling hills and a bustling waterfront',
  'Known for its cutting-edge technology hubs, sleek design',
  'A city of contrasts, where tradition meets modernity',
  'With its colorful markets, lively street performers, and a rich tapestry of diverse neighborhoods',
  'Surrounded by lush greenery and framed by majestic mountains'
];

const Counts = {
  DESTINATIONS: 10,
  DESCRIPTION_PHOTO: 4,
  OFFERS: 7,
  POINTS: 5,
};

const Price = {
  MIN: 1,
  MAX: 500
};

const Duration = {
  HOUR: 5,
  DAY: 3,
  MINUTE: 59
};

const OFFER_TYPES = [
  'Add luggage',
  'Switch to comfort class',
  'Add meal',
  'Choose seats',
  'Travel by train'
];

const FilterType = {
  EVERYTHING: 'all',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DEFAULT: 'date',
  TIME: 'time',
  PRICE: 'price'
};

export {
  EVENT_TYPES,
  CITIES,
  CITY_DESCRIPTION,
  PICTURE_DESCRIPTION,
  Counts,
  Price,
  Duration,
  OFFER_TYPES,
  FilterType,
  SortType
};
