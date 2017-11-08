import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SchemesStorageService from './../../services/schemesStorage.service';
import RealmsService from './../../services/realms.service';

class CollectionsComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  _onListClick(index) {
    const { collection, schemesStore, history } = this.props;
    schemesStore.mainSchema = Object.assign({}, collection[index].data);

    RealmsService
      .initFile(schemesStore.mainSchema)
        .then(() => {
          history.push('/entries');
        });
  }

  get savedSchemes() {
    const { collection } = this.props;

    return (
      <div className="list-group">
        {
          collection
            .filter(item => item.key)
            .map((item, index) => {
              return (
                <span key={item.data.name + index}
                  className="list-group-item list-group-item-action"
                  onClick={this._onListClick.bind(this, index)}>
                    <span className="badge badge-pill badge-info">
                      {
                        new Date(item.key).toLocaleString()
                      }
                    </span>
                    <h4 className="w-100 text-center">
                      {
                        item.data.name.toUpperCase()
                      }
                    </h4>
                </span>
              );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        {this.savedSchemes}
      </div>
    );
  }
}

CollectionsComponent.defaultProps = {
  collection: SchemesStorageService.fetch(),
};

export default CollectionsComponent;
