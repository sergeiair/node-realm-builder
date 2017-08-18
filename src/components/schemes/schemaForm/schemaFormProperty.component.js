import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { propertyTypes } from '../../../models/property.model';

class SchemaFormPropertyComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  _propertySettingChange(ev, type) {
    const { propertySettingChange } = this.props;

    switch (type) {
      case 'indexed':
        propertySettingChange(Boolean(parseInt(ev.target.value, 10)), type);
        propertySettingChange('int', 'type');
        break;
      case 'optional':
        propertySettingChange(Boolean(parseInt(ev.target.value, 10)), type);
        break;
      case 'relation':
        propertySettingChange(ev.target.value, type);
        propertySettingChange(ev.target.value === 'many' ? 'list' : 'int', 'type');
        break;
      default:
        propertySettingChange(ev.target.value, type);
        break;

    }
  }

  get propertyTypesValues() {
    const { data } = this.props;

    if (data.relation === 'many') {
      return propertyTypes.slice(propertyTypes.length - 1);
    }

    if (data.indexed) {
      return propertyTypes.slice(0, 3);
    }

    return propertyTypes.slice(0, propertyTypes.length - 1);
  }

  get relationControl() {
    const { data } = this.props;

    return (
      <div className="d-flex flex-column form-group mb-3">
        <label htmlFor="prop_name">Relation</label>
        <div className="btn-group" data-toggle="buttons">
          <label className={`btn btn-primary ${data.relation === 'one' ? 'active' : ''}`}>
            <input type="radio" name="options" id="one" value="one"
              disabled={data.relation === 'one'}
              onChange={(ev) => this._propertySettingChange(ev, 'relation')}/>
                To-one
          </label>
          <label className={`btn btn-primary ${data.relation === 'many' ? 'active' : ''}`}>
            <input type="radio" name="options" id="many" value="many"
              disabled={data.relation === 'many'}
              onChange={(ev) => this._propertySettingChange(ev, 'relation')}/>
                To-many
          </label>
        </div>
      </div>
    );
  }

  get propertyTypeControl() {
    const { data } = this.props;

    return (
      <div className="form-group mb-3">
        <label htmlFor="type_select">Type</label>
        <select id="type_select"
          className="form-control"
          onChange={(ev) => this._propertySettingChange(ev, 'type')}
          disabled={data.relation === 'many'}>
          {
            this.propertyTypesValues.map((el, index) =>
              <option key={index} value={el}>{el}</option>)
          }
        </select>
      </div>
    );
  }

  get propertyNameControl() {
    return (
      <div className="form-group mb-3">
        <label htmlFor="prop_name">Property name</label>
        <input className="form-control"
          type="text"
          id="prop_name"
          onChange={(ev) => this._propertySettingChange(ev, 'name')}/>
      </div>
    );
  }

  get propertyDefaultControl() {
    const { data } = this.props;
    let control = '';

    switch (data.type) {
      case 'date':
        control = (
          <input className="form-control"
            type="date"
            id="def_value"
            onChange={(ev) => this._propertySettingChange(ev, 'default')}/>
        );
        break;
      case 'int':
        control = (
          <input className="form-control"
            type="number"
            pattern="[0-9]"
            id="def_value"
            onChange={(ev) => this._propertySettingChange(ev, 'default')}/>
        );
        break;
      case 'string':
      case 'double':
        control = (
          <input className="form-control"
            id="def_value"
            onChange={(ev) => this._propertySettingChange(ev, 'default')}/>
        );
        break;
      default:
        control = (
          <input className="form-control"
            id="def_value"
            placeholder="Expecting int, double, string or date type"
            disabled={true} />
        );
      break;
    }

    return (
      <div className="form-group mb-3">
        <label htmlFor="def_value">Default value</label>
        { control }
      </div>
    );
  }

  get propertyOptionalControl() {
    return (
      <div className="form-group mb-3">
        <label htmlFor="prop_optional">Optional</label>
        <select id="prop_optional"
          className="form-control"
          onChange={(ev) => this._propertySettingChange(ev, 'optional')}>
            <option key={0} value='0'>No</option>
            <option key={1} value='1'>Yes</option>
        </select>
      </div>
    );
  }

  get propertyIndexedControl() {
    return (
      <div className="form-group mb-3">
        <label htmlFor="prop_indexed">Indexed</label>
        <select id="prop_indexed"
          className="form-control"
          onChange={(ev) => this._propertySettingChange(ev, 'indexed')}>
            <option key={0} value='0'>No</option>
            <option key={1} value='1'>Yes</option>
        </select>
      </div>
    );
  }

  render () {
    const { data } = this.props;

    return (
      <div className="mt-2">
        { /*this.relationControl*/ }
        { this.propertyNameControl }
        { this.propertyTypeControl }
        { data.relation === 'one' ? this.propertyIndexedControl : null}
        { data.relation === 'one' ? this.propertyOptionalControl : null}
        { data.relation === 'one' ? this.propertyDefaultControl : null}
      </div>
    );
  }
}

SchemaFormPropertyComponent.PropTypes = {
  data: PropTypes.object,
  propertySettingChange: PropTypes.func,
};

export default SchemaFormPropertyComponent;
