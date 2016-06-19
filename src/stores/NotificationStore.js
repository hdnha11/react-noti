import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

const ActionTypes = Constants.ActionTypes;

let notifications = [];
let newCount = 0;
let notification = null;

class NotificationStore extends Store {
  getNotifications() {
    return notifications;
  }

  getNewCount() {
    return newCount;
  }

  getNotification() {
    return notification;
  }

  __onDispatch(action) {
    let notificationId, updatedNotification, foundNotification;

    switch (action.type) {
      case ActionTypes.RECEIVE_NOTIFICATIONS:
        notifications = action.notifications;
        newCount = action.newCount;
        this.__emitChange();
        break;
      case ActionTypes.RECEIVE_NOTIFICATION:
        notification = action.notification;
        this.__emitChange();
        break;
      case ActionTypes.READ_NOTIFICATION_DONE:
        notificationId = action.notification.id;
        updatedNotification = notifications.filter(notification => {
          return notification.id === notificationId;
        })[0];

        updatedNotification && (updatedNotification.isRead = true);

        this.__emitChange();
        break;
      case ActionTypes.RESET_COUNTER_DONE:
        newCount = 0;
        this.__emitChange();
        break;
      case ActionTypes.UPDATE_NOTIFICATION:
        foundNotification = notifications.filter(notification => {
          return action.notification.id === notification.id;
        })[0];

        foundNotification && (foundNotification.isRead = action.notification.isRead);

        this.__emitChange();
        break;
      case ActionTypes.UPDATE_NOTIFICATION_NEW_COUNTER:
        newCount = action.newCount;
        this.__emitChange();
        break;
      case ActionTypes.NOTIFICATION_ARRIVED:
        notifications.push(action.notification);
        newCount = action.newCount;
        this.__emitChange();
        break;
      case ActionTypes.UPDATE_NOTIFICATIONS:
        notifications = action.notifications;
        newCount = action.newCount;
        this.__emitChange();
        break;
    }
  }
}

const notificationStore = new NotificationStore(AppDispatcher);

export default notificationStore;
