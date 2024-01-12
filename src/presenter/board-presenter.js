import { render, RenderPosition } from '../framework/render.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventListView from '../view/event-list-view.js';
import SortingView from '../view/sorting-view.js';
import TripView from '../view/trip-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripViewComponent = new TripView();
  #pointListViewComponent = new EventListView();
  #sortComponent = new SortingView();
  #noPointsComponent = new EventListEmptyView();

  #boardPoints = [];
  #pointPresenters = new Map();

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripViewComponent,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPointsList() {
    render(this.#pointListViewComponent, this.#tripContainer);
    this.#renderPoints();
  }

  #renderSort() {
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripView() {
    render(this.#tripViewComponent, this.#tripContainer);
  }

  #renderNoPointsView() {
    render(this.#noPointsComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      this.#renderNoPointsView();
    } else {
      this.#renderTripView();
      this.#renderSort();
      this.#renderPointsList();
    }
  }
}
