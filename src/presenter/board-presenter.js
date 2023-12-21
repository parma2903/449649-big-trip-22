import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import SortingView from '../view/sorting-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  sortingComponent = new SortingView();
  listComponent = new EventListView();

  constructor({ tripEventsContainer, pointsModel, destinationsModel, offersModel }) {
    this.tripEventsContainer = tripEventsContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    render(this.sortingComponent, this.tripEventsContainer);
    render(this.listComponent, this.tripEventsContainer);
    render(new PointEditorView(), this.listComponent.getElement());

    this.points.forEach((point) => {
      render(new PointView({
        point,
        pointDestination: this.destinationsModel.getById(point.destination),
        pointOffers: this.offersModel.getByType(point.type)
      }), this.listComponent.getElement());
    });
  }
}
