import React from 'react';
import {Link} from 'react-router';
import NotificationBoxContainer from '../containers/NotificationBoxContainer';

export class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">
              <span className="glyphicon glyphicon-home"></span> Noti
            </Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <NotificationBoxContainer />
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
