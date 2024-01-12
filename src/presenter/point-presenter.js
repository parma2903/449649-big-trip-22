import {render, replace, remove } from '../framework/render.js';
import PointView from '../view/point-view.js';
import PointEditView from '../view/point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export default class PointPresenter {
  #pointListContainer = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point,
      onEditClick: () => {
        this.#replacePointToEdit();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    this.#pointEditComponent = new PointEditView({
      point,
      onCloseClick: () => {
        this.#replacePointToView();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
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
