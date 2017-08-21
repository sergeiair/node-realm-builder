import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SchemesStore from './../stores/schemes.store';
import EntriesStore from './../stores/entries.store';

import SchemesComponent from '../components/schemes/schemes.component';
import CollectionsComponent from '../components/collections/collections.component';

import EntriesComponent from '../components/entries/entries.component';

class RootContainer extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Route
              path="/"
              exact={true}
              render={(routeProps) => React.createElement(SchemesComponent,
                {...routeProps, ...this.props})}/>
            <Route
              path="/entries"
              exact={true}
              render={(routeProps) => React.createElement(EntriesComponent,
                {...routeProps, ...this.props})}/>
            <Route
              path="/collections"
              exact={true}
              render={(routeProps) => React.createElement(CollectionsComponent,
                {...routeProps, ...this.props})}/>
          </div>
        </Router>
      </div>
    );
  }
}

RootContainer.defaultProps = {
  entriesStore: new EntriesStore(),
  schemesStore: new SchemesStore(),
};

export default RootContainer;
