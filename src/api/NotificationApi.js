import axios from 'axios';
import {getHostUrl} from './HostConfig';
import * as NotificationActionCreators from '../actions/NotificationActionCreators';

export function getNotifications() {
  return axios.get(`${getHostUrl()}/api/notifications`)
    .then(response => {
      NotificationActionCreators.receiveNotifications(response.data.notifications, response.data.newCount);
    });
}

export function getNotification(id) {
  return axios.get(`${getHostUrl()}/api/notifications/${id}`)
    .then(response => {
      NotificationActionCreators.receiveNotification(response.data);
    });
}

export function readNotification(id) {
  return axios.put(`${getHostUrl()}/api/notifications/${id}/read`)
    .then(response => {
      NotificationActionCreators.readNotificationDone(response.data);
    });
}

export function resetCounter() {
  return axios.post(`${getHostUrl()}/api/notifications/reset/counter`)
    .then(() => {
      NotificationActionCreators.resetCounterDone();
    });
}
