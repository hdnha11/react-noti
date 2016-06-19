import React from 'react';
import {Link} from 'react-router';
import * as NotificationActionCreators from '../actions/NotificationActionCreators';

class NotificationItem extends React.Component {
  readNotification() {
    NotificationActionCreators.readNotification(this.props.notificationId);
    NotificationActionCreators.getNotification(this.props.notificationId);
  }

  render() {
    let image, itemClasses;

    if (this.props.imageUrl) {
      image = (
        <span className="pull-left m-r thumb-sm">
          <img src={this.props.imageUrl} alt="..." className="img-circle" />
        </span>
      );
    }

    itemClasses = this.props.active ? 'list-group-item list-group-item--active' : 'list-group-item';

    return (
      <Link
        onClick={this.readNotification.bind(this)}
        to={`/notifications/${this.props.notificationId}`}
        className={itemClasses}
      >
        {image}
        <span className="clear block m-b-none">
          {this.props.children}
        </span>
      </Link>
    );
  }
}

export default NotificationItem;
