import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import SchemaFormPropertyComponent from './schemaFormProperty.component';
import IncDecComponent from './../../common/incDec.component';

import { propertyTypes } from '../../../models/property.model';

class SchemaFormComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  _onNameChange(event) {
    const { update } = this.props;

    update({name: event.target.value});
  }

  _onPKeyChange(event) {
    const { update } = this.props;

    update({primaryKey: event.target.value});
  }

  _propertySettingChange(value, type, index) {
    const { update } = this.props;

    update({propertyPrm: {[type]: value}, index});
  }

  _onIncClick() {
    const { addProperty } = this.props;

    addProperty({
      type: propertyTypes[0],
    });
  }

  _onDecClick(index) {
    const { dropProperty } = this.props;

    dropProperty(index);
  }

  get nameField() {
    return (
      <div className="input-group mb-2">
        <span id="s_name"
          className="input-group-addon">
            Schema name:
        </span>
        <input type="text"
          className="form-control"
          aria-describedby="s_name"
          onChange={this._onNameChange.bind(this)}/>
      </div>
    );
  }

  get primaryKeyField() {
    const { properties } = this.props;
    const propertiesFiltered = properties.filter(el => el.name);

    return (
      <div className="input-group mb-2">
        <span id="p_key"
          className="input-group-addon">
            P. key:
        </span>
        <select id="p_key"
          className="form-control"
          disabled={!propertiesFiltered.length}
          onChange={this._onPKeyChange.bind(this)}>
            {
              propertiesFiltered.map((el, index) => {
                return (
                  <option key={index + el.name}
                    value={el.name}>{el.name}
                  </option>
                );
              })
            }
        </select>
      </div>
    );
  }

  get propertiesList() {
    const { properties } = this.props;
    return (
      <div>
        {
          properties.map((el, i) => {
            return (
              <div className="px-3 pt-2 pb-3 mb-4 bordered rounded" key={i}>
                <SchemaFormPropertyComponent
                  data={el}
                  propertySettingChange={(value, type) =>
                    this._propertySettingChange(value, type, i)}/>
                <IncDecComponent
                  incClick={this._onIncClick.bind(this)}
                  decClick={this._onDecClick.bind(this, i)}
                  disabledMin={!i}
                  disabledMax={(!i && properties.length > 1)
                    || properties.length > i + 1}/>
              </div>
            );
          })
        }
      </div>
    );
  }

  render() {
    return (
      <div className="d-flex flex-row align-items-center justify-content-between">
        <div className="flex-2 pr-2">
          <h3>Main schema</h3>
          <div className="d-flex flex-column">
            <div>
              { this.nameField }
              { this.primaryKeyField }
            </div>
            <div className="mt-3">
              { this.propertiesList }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SchemaFormComponent.PropTypes = {
  name: PropTypes.string.isRequired,
  properties: PropTypes.array.isRequired,
  primaryKey: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired,
  addProperty: PropTypes.func.isRequired,
  dropProperty: PropTypes.func.isRequired,
};

export default SchemaFormComponent;
