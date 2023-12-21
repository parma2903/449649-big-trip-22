import {createElement} from '../render.js';

function createEventListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class FilterView {
  getTemplate() {
    return createEventListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
