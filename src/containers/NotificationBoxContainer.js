import React from 'react';
import io from 'socket.io-client'
import {getHostUrl} from '../api/HostConfig';
import NotificationStore from '../stores/NotificationStore';
import NotificationBox from '../components/NotificationBox';
import * as NotificationActionCreators from '../actions/NotificationActionCreators';

let socket = io(getHostUrl());

class NotificationBoxContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      newCount: 0
    };

    socket.on('current-state', data => {
      NotificationActionCreators.updateNotifications(data.notifications, data.newCount);
    });

    socket.on('notification-updated', notification => {
      NotificationActionCreators.updateNotification(notification);
    });

    socket.on('new-notification', data => {
      NotificationActionCreators.notificationArrived(data.notification, data.newCount);
    });

    socket.on('new-count-updated', newCount => {
      NotificationActionCreators.updateNotificationNewCounter(newCount);
    });
  }

  componentDidMount() {
    this.storeToken = NotificationStore.addListener(() => {
      let notifications = NotificationStore.getNotifications();
      let newCount = NotificationStore.getNewCount();
      this.setState({
        notifications,
        newCount
      });
    });

    NotificationActionCreators.getNotifications();
  }

  componentWillUnmount() {
    this.storeToken.remove();
  }

  render() {
    return (
      <NotificationBox {...this.state} />
    );
  }

}

export default NotificationBoxContainer;
