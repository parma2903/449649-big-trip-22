import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';

const BLANK_POINT = {
  type: '',
  dateFrom: dayjs().toDate(),
  dateTo: dayjs().toDate(),
  basePrice: 0,
  offers: [],
  destination: {
    name: '',
    description: '',
    pictures: [],
  },
};

const POINT_TYPES = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  TRANSPORT: 'transport',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECKIN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTARAUNT: 'restaurant',
};

const createOfferName = (offer = {}) => {
  let offerName = '';
  switch (offer.title) {
    case 'Add luggage':
      offerName = 'luggage';
      break;
    case 'Switch to comfort':
      offerName = 'comfort';
      break;
    case 'Add meal':
      offerName = 'meal';
      break;
    case 'Choose seats':
      offerName = 'seats';
      break;
    case 'Travel by train':
      offerName = 'train';
      break;
    default:
      offerName = '';
  }

  return offerName;
};

const createOfferSelector = (point = {}) => {
  const { offers } = point;
  const pointId = point.id;

  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${createOfferName(offer)}-${pointId}" type="checkbox" name="event-offer-${createOfferName(offer)}" checked>
      <label class="event__offer-label" for="event-offer-${createOfferName(offer)}-${pointId}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join('');
};


const createOffersSection = (point) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOfferSelector(point)}
    </div>
  </section>`
);

const createPointTypeItem = (pointId, eventTypes) => {
  const types = Object.values(eventTypes);

  return types.map((type) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-${type}-${pointId}">${type[0].toUpperCase() + type.substring(1)}</label>
    </div>`).join('');
};

const createPointDestinationsTemplate = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('');

export const createEditViewTemplate = (point, offers, destinations) => {
  const { type, dateFrom, dateTo, basePrice } = point;
  const {description, name, pictures} = point.destination || {};
  const pointId = point.id || 0;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createPointTypeItem(pointId, POINT_TYPES)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${pointId}">${type}</label>
            <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${name || ''}" list="destination-list-${pointId}">

            <!-- Список пунктов назначения -->
            <datalist id="destination-list-${pointId}">
              ${createPointDestinationsTemplate(destinations)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dayjs(dateFrom).format('DD/MM/YY HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dayjs(dateTo).format('DD/MM/YY HH:mm')}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
            ${offers.length > 0 ? createOffersSection(point) : ''}
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures.map((picture) => (`<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)).join('')}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditView extends AbstractStatefulView {
  #point = null;
  #offers = [];
  #destinations = [];
  #handleCloseClick = null;
  #handleSaveClick = null;
  #handleDeleteClick = null;

  constructor({ point = BLANK_POINT, onCloseClick, onSaveClick, onDeleteClick }) {
    super();
    this.#point;
    this._setState(EditView.parsePointToState(point));
    this.#handleCloseClick = onCloseClick;
    this.#handleSaveClick = onSaveClick;
    this.#handleDeleteClick = onDeleteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const task = {...state};
    return task;
  }

  get template() {
    return createEditViewTemplate(this._state, this.#offers, this.#destinations);
  }

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleSaveClick(EditView.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };
}
