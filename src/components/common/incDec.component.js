import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class IncDecComponent extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    const {disabledMin, disabledMax, incClick, decClick} = this.props;

    return (
      <div className="d-flex flex-row justify-content-between">
        <div/>
        <div>
          <button className="btn btn-info"
            disabled={disabledMin}
            onClick={decClick}>-
          </button>
          <button className="ml-1 btn btn-info"
            disabled={disabledMax}
            onClick={incClick}>+
          </button>
        </div>
      </div>
    );
  }
}

IncDecComponent.defaultProps = {
  disabledMax: false,
  disabledMin: false,
};

IncDecComponent.PropTypes = {
  disabledMin: PropTypes.bool,
  disabledMax: PropTypes.bool,
  incClick: PropTypes.func,
  decClick: PropTypes.func,
};

export default IncDecComponent;
