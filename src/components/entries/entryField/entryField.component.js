import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class EntryFieldComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  getField(type, id, value = null) {
    const { entryFieldChange } = this.props;

    switch (type) {
      case 'int':
        return (<input
          id={id}
          type="number"
          className="d-block w-100 form-control"
          pattern="^[0-9]+$"
          defaultValue={value}
          onChange={ev => {
            entryFieldChange({
              target: {
                value: parseInt(ev.target.value, 10),
              }
            });
          }}/>
        );
      case 'string':
        return (<textarea
          id={id}
          className="d-block w-100 form-control"
          defaultValue={value}
          onChange={entryFieldChange}/>
        );
      default:
        return (<input
          id={id}
          className="d-block w-100 form-control"
          defaultValue={value}
          onChange={entryFieldChange}/>
        );
    }
  }

  render() {
    const { name, type, value } = this.props;
    const id = name.split(' ')[0];

    return (
      <div>
        <div className="form-group mb-3">
          <label htmlFor={`field_${id}`}>
            Field: <strong>{name}</strong>
          </label>
          { this.getField(type, id, value) }
        </div>
      </div>
    );
  }
}

EntryFieldComponent.PropTypes = {
  entryFieldChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
};

export default EntryFieldComponent;
