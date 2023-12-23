import { render } from '../framework/render.js';
import PointView from '../view/point-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortingView from '../view/sorting-view.js';
import TripView from '../view/trip-view.js';

export default class BoardPresenter {
  #tripContainer = null;
  #pointsModel = null;

  #tripViewComponent = new TripView();
  #pointListViewComponent = new EventListView();

  #boardPoints = [];

  constructor({ tripContainer, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    if (this.#boardPoints.length === 0) {
      render(new EventListEmptyView(), this.#tripContainer);
    } else {
      render(new SortingView(), this.#tripContainer);
      render(this.#tripViewComponent, this.#tripContainer);
      render(this.#pointListViewComponent, this.#tripContainer);
      render(new PointEditView({ point: this.#boardPoints[0] }), this.#pointListViewComponent.element);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({point});

    render(pointComponent, this.#pointListViewComponent.element);
  }
}
