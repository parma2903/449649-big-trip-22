import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import {RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-main');
const filterElement = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.page-body__page-main');
const listElement = siteMainElement.querySelector('.page-body__container');
const boardPresenter = new BoardPresenter({container: listElement});

render(new TripInfoView(), siteHeaderElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterElement);

boardPresenter.init();
