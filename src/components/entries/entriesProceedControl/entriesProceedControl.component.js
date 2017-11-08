import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class EntriesProceedControl extends PureComponent {
	render() {
    const { hidden, proceed } = this.props;

    if (hidden) {
      return null;
    }

    return (
      <div className="fixed">
        <button
          title="Finish schemes and create realm file"
          className="my-4 btn btn-link cursor-pointer"
          onClick={proceed}>

          <img className="icon icon-80"
            src="/assets/svg/dot-right-arrow.svg" />
        </button>
      </div>
    );
	}
}

EntriesProceedControl.propTypes = {
  hidden: PropTypes.bool.isRequired,
  proceed: PropTypes.func.isRequired
};
EntriesProceedControl.defaultProps = {};

export default EntriesProceedControl;
