import {render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #offers = null;
  #destinations = null;
  #onClickFavouriteButton = null;
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({offers, destinations, pointListContainer, onClickFavouriteButton, onDataChange, onModeChange}) {
    this.#offers = offers;
    this.#destinations = destinations;
    this.#pointListContainer = pointListContainer;
    this.#onClickFavouriteButton = onClickFavouriteButton;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offers,
      destination: this.#destinations,
      onEditClick: () => {
        this.#replacePointToEdit();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onClickFavouriteButton: this.#handleFavouriteClick
    });

    this.#pointEditComponent = new PointEditView({
      point: point,
      offers: this.#offers,
      destinations: this.#destinations,
      onSubmit: this.#handleSaveClick,
      onCloseClick: () => {
        this.#replacePointToView();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      },
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replacePointToView();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replacePointToView();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replacePointToEdit() {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replacePointToView() {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleEditClick = () => {
    this.#replacePointToEdit();
  };

  #handleSaveClick = (point) => {
    this.#handleDataChange(point);
    this.#replacePointToView();
  };

  #handleDeleteClick = () => {
    this.#replacePointToView();
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({...this.#point, isFavourite: !this.#point.isFavourite});
  };
}
