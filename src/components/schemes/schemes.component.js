import React, { PureComponent } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';

import SchemesStore from './../../stores/schemes.store';
import RealmsService from './../../services/realms.service';
import SchemesStorageService from './../../services/schemesStorage.service';

import SchemaFormComponent from './schemaForm/schemaForm.component';

@observer
class SchemesComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { schemesStore } = this.props;

    schemesStore.resetMainSchema();
  }

  _onMainSchemaChange(data) {
    const { schemesStore } = this.props;

    schemesStore.updateMainSchema(data);
  }

  _onPropertyAddition(data) {
    const { schemesStore } = this.props;

    schemesStore.addMainSchemaProperty(data);
  }

  _onPropertyDrop(index) {
    const { schemesStore } = this.props;

    schemesStore.dropMainSchemaProperty(index);
  }

  _onProceed() {
    const { schemesStore } = this.props;

    RealmsService.initFile(schemesStore.mainSchema)
      .then(() => {
        SchemesStorageService.save(schemesStore.mainSchema);

        this._onRealmCreate();
      });
  }

  _onRealmCreate() {
    const { history } = this.props;

    history.push('/entries');
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
    const { schemesStore } = this.props;

    return (
      <div className="container">
        <div className="d-flex flex-row">
          <div className="flex-2">
            <SchemaFormComponent
              primaryKey={schemesStore.mainSchema.primaryKey}
              name={schemesStore.mainSchema.name}
              properties={schemesStore.mainSchema.properties}
              update={this._onMainSchemaChange.bind(this)}
              addProperty={this._onPropertyAddition.bind(this)}
              dropProperty={this._onPropertyDrop.bind(this)}/>
          </div>
          <div className="flex-1">
            <div className="fixed">
              { this.proceedControl }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchemesComponent.PropTypes = {
  history: PropTypes.object.isRequired,
  schemesStore: SchemesStore.isRequired,
};

export default SchemesComponent;
