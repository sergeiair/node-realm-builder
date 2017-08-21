import React, { Component } from 'react';
import { enableLogging } from 'mobx-logger';

import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import RootContainer from './containers/root.container';

enableLogging({
  action: true,
  reaction: false,
  compute: false
});

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">New schema</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/collections">Saved schemes</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="py-5 main">
          <RootContainer/>
          <NotificationContainer/>
        </div>
      </div>
    );
  }
}

export default App;
