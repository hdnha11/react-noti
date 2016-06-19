import React from 'react';
import moment from 'moment';
import * as NotificationActionCreators from '../actions/NotificationActionCreators';
import NotificationItem from '../components/NotificationItem';

class NotificationBox extends React.Component {
  onShowNotificationBox() {
    NotificationActionCreators.resetCounter();
  }

  render() {
    return (
      <li className="dropdown" onClick={this.onShowNotificationBox.bind(this)}>
        <a href="#" data-toggle="dropdown" className="dropdown-toggle" aria-expanded="true">
          <i className="glyphicon glyphicon-bell"></i>
          <span className="visible-xs-inline">Notifications</span>
          <span className="badge badge--sm badge--up badge--danger pull-right-xs">
            {this.props.newCount || ''}
          </span>
        </a>
        <div className="dropdown-menu w-xl animated fadeInUp">
          <div className="panel bg-white">
            <div className="panel-heading b-light bg-light">
              <strong>
                You have <span>{this.props.notifications.length}</span> notifications
              </strong>
            </div>
            <div className="list-group">
              {this.props.notifications.map((notification) => {
                return (
                  <NotificationItem
                    key={notification.id}
                    notificationId={notification.id}
                    imageUrl={notification.imageContent}
                    active={!notification.isRead}
                  >
                    {notification.textContent}<br />
                  <small className="text-muted">{moment(notification.time).fromNow()}</small>
                  </NotificationItem>
                );
              })}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default NotificationBox;
