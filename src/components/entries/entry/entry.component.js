import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import EntryFieldComponent from './../entryField/entryField.component';

class EntryComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  get fields() {
    const { schema, data, entryFieldChange } = this.props;

    return schema.properties
      .map((prop, i) => (
        <EntryFieldComponent
          key={prop.name + i}
          index={i}
          value={data[prop.name]}
          type={prop.type}
          name={prop.name}
          entryFieldChange={
            ev => entryFieldChange(ev.target.value, prop.name)
          }/>
      ));
  }

  render() {
    return (
      <div className="my-2">
        {this.fields}
      </div>
    );
  }
}

EntryComponent.PropTypes = {
  schema: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  entryFieldChange: PropTypes.func.isRequired,
};

export default EntryComponent;
