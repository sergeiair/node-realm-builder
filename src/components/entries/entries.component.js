import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import RealmsService from './../../services/realms.service';

import SchemesStore from './../../stores/schemes.store';
import EntriesStore from './../../stores/entries.store';

import EntryComponent from './entry/entry.component';
import IncDecComponent from './../common/incDec.component';

@observer
class EntriesComponent extends PureComponent {

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

  _removeEntry(i) {
    const { entriesStore } = this.props;

    entriesStore.dropEntry(i);
  }

  _onProceed() {
    const { entriesStore, history } = this.props;

    RealmsService.writeData(entriesStore.entries)
      .then((res) => {
        history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
  }

  get entriesGuard() {
    const { schemesStore } = this.props;
    const properties = schemesStore.mainSchema.properties;
    const propertiesAdded = properties.length > 1 || properties[0].name;

    return (
      !propertiesAdded ? <Redirect to="/"/> : null
    );
  }

  get entriesForms() {
    const { schemesStore, entriesStore } = this.props;

    return entriesStore.entries.map((entry, i) => (
      <div key={i} className="p-3 mb-4 bordered rounded">
        <EntryComponent
          data={entry}
          schema={schemesStore.mainSchema}
          entryFieldChange={(val, name) => {
            entriesStore.entryUpdate(val, name, i);
          }}/>
        <IncDecComponent
          disabledMin={!i}
          incClick={this._addNewEntry.bind(this)}
          decClick={this._removeEntry.bind(this, i)}/>
      </div>
    ));
  }

  get emptyEntriesControls() {
    return (
      <div className="d-flex flex-row align-items-center justify-content-center">
        <h3 className="pr-5">Add new entry by clicking +</h3>

        <IncDecComponent
          disabledMin={true}
          incClick={this._addNewEntry.bind(this)}/>
      </div>
    );
  }

  get proceedControl() {
    const { schemesStore } = this.props;

    return (
      <button
        title="Finish schemes and create realm file"
        className="my-4 btn btn-link cursor-pointer"
        disabled={!schemesStore.isSchemaValid}
        onClick={this._onProceed.bind(this)}>
        <img className="icon icon-80"
          src="/assets/svg/dot-right-arrow.svg" />
      </button>
    );
  }

  render() {
    const { entriesStore } = this.props;

    return (
      <div className="container">
        {this.entriesGuard}
        <div className="d-flex flex-row">
          <div className="flex-2">
            {
              entriesStore.entries.length
                ? this.entriesForms
                : this.emptyEntriesControls
            }
          </div>
          <div className="flex-1">
            <div className="fixed">
              { entriesStore.entries.length
                  ? this.proceedControl
                  : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EntriesComponent.PropTypes = {
  history: PropTypes.object.isRequired,
  schemesStore: SchemesStore.isRequired,
  entriesStore: EntriesStore.isRequired,
};

export default EntriesComponent;
