import React from 'react';

class Notification extends React.Component {
  render() {
    return (
      <div>
        <h1>Notification {this.props.notification.id}</h1>
        <p>{this.props.notification.textContent}</p>
      </div>
    );
  }
}

export default Notification;
