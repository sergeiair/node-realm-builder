import React, {PureComponent} from 'react';
import {pipe, tryCatch, filter, is, keys, F, ifElse} from 'ramda';
import PropTypes from 'prop-types';

class EntriesJsonParser extends PureComponent {

  constructor(props) {
    super(props);

    this.contentArea = null;
  }

  _tryParse() {
    const {fillEntriesStore} = this.props;

    pipe(
      tryCatch(JSON.parse, F),
      filter(is(Object)),
      ifElse(
        data => keys(data)[0],
        data => fillEntriesStore(data[keys(data)[0]]),
        this._markInputAsInvalid.bind(this)
      )
    )(this.contentArea.value);
  }

  _markInputAsInvalid() {
    this.contentArea.classList.add('invalid');
  }

	render() {
		return (
      <div controls="d-flex flex-column mb-4">
        <h3 className="pr-5 font-weight-normal text-center">
          Paste some VALID JSON to fill the entries store
        </h3>

        <textarea ref={(textarea) => { this.contentArea = textarea;}}
          className="w-100 p-2 rounded"
          placeholder={`Example: {"items": [array of objects representing your schema]}`}
          rows="30"/>

        <button className="btn btn-dark w-100 my-2"
          onClick={this._tryParse.bind(this)}>
            Parse
        </button>
      </div>
		);
	}
}

EntriesJsonParser.propTypes = {
  fillEntriesStore: PropTypes.func.isRequired
};
EntriesJsonParser.defaultProps = {};

export default EntriesJsonParser;
