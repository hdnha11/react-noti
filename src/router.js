import React from 'react';
import {Router, Route, browserHistory} from 'react-router';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './components/Home';
import NotificationContainer from './containers/NotificationContainer';

export default (
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={Home} />

      <Route path="notifications">
        <Route path=":notificationId" component={NotificationContainer} />
      </Route>
    </Route>
  </Router>
);
