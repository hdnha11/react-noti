import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';
import * as NotificationApi from '../api/NotificationApi';

const ActionTypes = Constants.ActionTypes;

export function getNotifications() {
  AppDispatcher.dispatch({
    type: ActionTypes.GET_NOTIFICATIONS
  });
  NotificationApi.getNotifications();
}

export function receiveNotifications(notifications, newCount) {
  AppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_NOTIFICATIONS,
    notifications,
    newCount
  });
}

export function getNotification(id) {
  AppDispatcher.dispatch({
    type: ActionTypes.GET_NOTIFICATION,
    id
  });
  NotificationApi.getNotification(id);
}

export function receiveNotification(notification) {
  AppDispatcher.dispatch({
    type: ActionTypes.RECEIVE_NOTIFICATION,
    notification
  });
}

export function readNotification(id) {
  AppDispatcher.dispatch({
    type: ActionTypes.READ_NOTIFICATION,
    id
  });
  NotificationApi.readNotification(id);
}

export function readNotificationDone(notification) {
  AppDispatcher.dispatch({
    type: ActionTypes.READ_NOTIFICATION_DONE,
    notification
  });
}

export function resetCounter() {
  AppDispatcher.dispatch({
    type: ActionTypes.RESET_COUNTER
  });
  NotificationApi.resetCounter();
}

export function resetCounterDone() {
  AppDispatcher.dispatch({
    type: ActionTypes.RESET_COUNTER_DONE
  });
}

export function updateNotification(notification) {
  AppDispatcher.dispatch({
    type: ActionTypes.UPDATE_NOTIFICATION,
    notification
  });
}

export function updateNotificationNewCounter(newCount) {
  AppDispatcher.dispatch({
    type: ActionTypes.UPDATE_NOTIFICATION_NEW_COUNTER,
    newCount
  });
}

export function notificationArrived(notification, newCount) {
  AppDispatcher.dispatch({
    type: ActionTypes.NOTIFICATION_ARRIVED,
    notification,
    newCount
  });
}

export function updateNotifications(notifications, newCount) {
  AppDispatcher.dispatch({
    type: ActionTypes.UPDATE_NOTIFICATIONS,
    notifications,
    newCount
  });
}
