import TripInfoView from './view/trip-info-view.js';
import FiltersView from './view/filters-view.js';
import {RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/event-points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');
const filtersContainer = tripMainContainer.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const boardPresenter = new BoardPresenter({ tripEventsContainer, pointsModel, offersModel, destinationsModel });

render(new TripInfoView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new FiltersView(), filtersContainer);

boardPresenter.init();
