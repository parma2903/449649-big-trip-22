import { render } from '../render.js';
import PointView from '../view/point-view.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import EventListView from '../view/event-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import SortingView from '../view/sorting-view.js';
import TripView from '../view/trip-view.js';

export default class BoardPresenter {
  tripViewComponent = new TripView();
  pointListViewComponent = new EventListView();

  constructor({ tripContainer, pointsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.pointsModel = [...this.pointsModel.getPoints()];

    if (this.pointsModel.length === 0) {
      render(new EventListEmptyView(), this.tripContainer);
    } else {
      render(new SortingView(), this.tripContainer);
      render(this.tripViewComponent, this.tripContainer);
      render(this.pointListViewComponent, this.tripContainer);
      render(new PointEditView({ point: this.pointsModel[0] }), this.pointListViewComponent.getElement());

      for (let i = 0; i < this.pointsModel.length; i++) {
        render(new PointView({ point: this.pointsModel[i] }), this.pointListViewComponent.getElement());
      }
    }
  }
}
