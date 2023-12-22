import { CITY_DESCRIPTION, CITIES, PICTURE_DESCRIPTION } from '../const.js';
import { getRandomPositiveNumber } from '../utils.js';

const generatePicture = () => ({
  src: `https://loremflickr.com/248/152?random=${getRandomPositiveNumber(1, 10)}`,
  description: PICTURE_DESCRIPTION[getRandomPositiveNumber(0, PICTURE_DESCRIPTION.length - 1)],
});

const generateDestinations = () => {
  const picturesCount = getRandomPositiveNumber(0, 3);

  return {
    description: CITY_DESCRIPTION[getRandomPositiveNumber(0, CITY_DESCRIPTION.length - 1)],
    name: CITIES[getRandomPositiveNumber(0, CITIES.length - 1)],
    pictures: new Array(picturesCount).fill().map(generatePicture),
  };
};

export { generateDestinations };
