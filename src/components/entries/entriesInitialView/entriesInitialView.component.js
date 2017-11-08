import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import IncDecComponent from '../../common/incDec.component';
import EntriesJsonParser from '../entriesJsonParser/entriesJsonParser.component';

class EntriesInitialView extends PureComponent {
	render() {
    const {addNewEntry, fillEntriesStore} = this.props;

    return (
      <div className="d-flex flex-column">
        <EntriesJsonParser
          fillEntriesStore={fillEntriesStore} />

        <div className="d-flex flex-row align-items-center justify-content-center mt-3">
          <h3 className="pr-5 font-weight-normal">
            Or click <strong>plus</strong> to proceed
          </h3>

          <IncDecComponent
            disabledMin={true}
            incClick={addNewEntry}/>
        </div>

      </div>
    );
	}
}

EntriesInitialView.propTypes = {
  fillEntriesStore: PropTypes.func.isRequired,
  addNewEntry: PropTypes.func.isRequired
};
EntriesInitialView.defaultProps = {};

export default EntriesInitialView;
