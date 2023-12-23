import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { render, RenderPosition } from './framework/render.js';

const tripMain = document.querySelector('.trip-main');
const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({ tripContainer: tripEvents, pointsModel });

render(new TripInfoView, tripMain, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFilters);
boardPresenter.init();
