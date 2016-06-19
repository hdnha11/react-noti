import React from 'react';
import Notification from '../components/Notification';
import NotificationStore from '../stores/NotificationStore';

class NotificationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: NotificationStore.getNotification() || {}
    };
  }

  componentDidMount() {
    this.storeToken = NotificationStore.addListener(() => {
      let notification = NotificationStore.getNotification() || {};
      this.setState({
        notification
      });
    });
  }

  componentWillUnmount() {
    this.storeToken.remove();
  }

  render() {
    return (
      <Notification {...this.state} />
    );
  }

}

export default NotificationContainer;
