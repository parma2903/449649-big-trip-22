import AbstractView from '../framework/view/abstract-view.js';

function createTripViewTemplate() {
  return `
      <div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>
        </section>
      </div>`;
}

export default class TripView extends AbstractView {
  get template() {
    return createTripViewTemplate();
  }
}
