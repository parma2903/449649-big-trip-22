import { render, replace, RenderPosition } from '../framework/render.js';
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
  #sortComponent = new SortingView();
  #noPointsComponent = new EventListEmptyView();

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
