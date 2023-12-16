import EventListView from '../view/events-list-view.js';
import EventItemView from '../view/event-item-view.js';
import PointEditorView from '../view/point-editor-view.js';
import SortingView from '../view/sorting-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  sortingComponent = new SortingView();
  listComponent = new EventListView();

  constructor({ tripEventsContainer, pointsModel, offersModel, destinationsModel }) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.eventPoints = [...this.pointsModel.getEventPoints()];
    render(this.sortingComponent, this.tripEventsContainer);
    render(this.listComponent, this.tripEventsContainer);
    render(new PointEditorView(), this.listComponent.getElement());

    for (let i = 0; i < this.eventPoints.length; i++) {
      const offers = this.offersModel.getByType(this.eventPoints[i].type);
      const destination = this.destinationsModel.getById(this.eventPoints[i].destination);
      render(new EventItemView({
        eventPoint: this.eventPoints[i],
        offers,
        destination
      }), this.listComponent.getElement());
    }
  }
}
