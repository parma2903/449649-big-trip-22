import { render, replace } from '../framework/render.js';
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

    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replacePointToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const pointComponent = new PointView({
      point,
      onEditClick: () => {
        replacePointToEdit();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new PointEditView({
      point,
      onCloseClick: () => {
        replacePointToView();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToEdit() {
      replace(pointEditComponent, pointComponent);
    }

    function replacePointToView() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListViewComponent.element);
  }

  #renderBoard() {
    if (this.#boardPoints.length === 0) {
      render(new EventListEmptyView(), this.#tripContainer);
    } else {
      render(new SortingView(), this.#tripContainer);
      render(this.#tripViewComponent, this.#tripContainer);
      render(this.#pointListViewComponent, this.#tripContainer);

      for (let i = 0; i < this.#boardPoints.length; i++) {
        this.#renderPoint(this.#boardPoints[i]);
      }
    }
  }
}
