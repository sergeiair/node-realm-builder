import React, {Component} from 'react';
import PropTypes from 'prop-types';

import EntryComponent from './../entry/entry.component';
import IncDecComponent from '../../common/incDec.component';

class EntriesFormsComponent extends Component {

  shouldComponentUpdate(nextProps) {
    const { entries } = this.props;
    const nextEntries = nextProps.entries;

    return nextEntries.length !== entries.length;
  }

	render() {
    const { mainSchema, entries, addNewEntry, removeEntry, entryUpdate } = this.props;

    return (
      <div>
        {
          entries.map((entry, i) => (
            <div key={entry.uid}
              className="p-3 mb-4 bordered rounded">

                <EntryComponent
                  data={entry}
                  schema={mainSchema}
                  entryFieldChange={(val, name) => {
                    entryUpdate(val, name, i);
                  }}/>

                <IncDecComponent
                  disabledMin={!i}
                  incClick={addNewEntry}
                  decClick={() => removeEntry(i)}/>

            </div>
          ))
        }
      </div>
    );
	}
}

EntriesFormsComponent.propTypes = {
  entries: PropTypes.array.isRequired,
  mainSchema: PropTypes.object.isRequired,
  addNewEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
  entryUpdate: PropTypes.func.isRequired
};
EntriesFormsComponent.defaultProps = {};

export default EntriesFormsComponent;
