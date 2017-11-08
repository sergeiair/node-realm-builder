import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import RealmsService from './../../services/realms.service';

import SchemesStore from './../../stores/schemes.store';
import EntriesStore from './../../stores/entries.store';

import EntriesForms from './entriesForms/entriesForms.component';
import EntriesInitialView from './entriesInitialView/entriesInitialView.component';
import EntriesProceedControl from './entriesProceedControl/entriesProceedControl.component';

@observer
class EntriesWrapperComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { entriesStore } = this.props;

    entriesStore.resetEntries();
  }

  _addNewEntry() {
    const { schemesStore, entriesStore } = this.props;

    entriesStore.addEmptyEntry(schemesStore.mainSchema.properties);
  }

  _fillEntriesStore(data) {
    const { entriesStore } = this.props;

    entriesStore.entries = data;
  }

  _removeEntry(i) {
    const { entriesStore } = this.props;

    entriesStore.dropEntry(i);
  }

  _updateEntry(value, name, index) {
    const { entriesStore } = this.props;

    entriesStore.entryUpdate(value, name, index);
  }

  _onProceed() {
    const { entriesStore, history } = this.props;

    RealmsService.writeData(entriesStore.entries)
      .then((res) => {
        history.push('/');
      })
      .catch(console.error);
  }

  get entriesGuard() {
    const { schemesStore } = this.props;
    const properties = schemesStore.mainSchema.properties;
    const propertiesAdded = properties.length > 1 || properties[0].name;

    return (
      !propertiesAdded ? <Redirect to="/"/> : null
    );
  }

  render() {
    const { entriesStore, schemesStore } = this.props;

    return (
      <div className="container">
        {this.entriesGuard}

        <div className="d-flex flex-row">
          <div className="flex-2">
            {
              entriesStore.entries.length
                ? <EntriesForms
                  mainSchema={schemesStore.mainSchema}
                  entries={entriesStore.entries}
                  removeEntry={this._removeEntry.bind(this)}
                  addNewEntry={this._addNewEntry.bind(this)}
                  entryUpdate={this._updateEntry.bind(this)}/>
                : <EntriesInitialView
                  fillEntriesStore={this._fillEntriesStore.bind(this)}
                  addNewEntry={this._addNewEntry.bind(this)}/>
            }
          </div>
          <div className="flex-1">
            <EntriesProceedControl
              hidden={!entriesStore.entries.length}
              proceed={this._onProceed.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

EntriesWrapperComponent.PropTypes = {
  history: PropTypes.object.isRequired,
  schemesStore: SchemesStore.isRequired,
  entriesStore: EntriesStore.isRequired,
};

export default EntriesWrapperComponent;
