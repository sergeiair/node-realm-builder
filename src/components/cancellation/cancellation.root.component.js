import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import CancellationPending from './cancellation.pending.component';
import CancellationConfirmed from './cancellation.confirmed.component';
import CancellationFailed from './cancellation.failed.component';
import CancellationDenied from './cancellation.denied.component';
import Loader from './../common/loader.component';
import * as apiConstants from './../../constants/api';

class CancellationRoot extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: null,
      data: null,
    };
  }

  get urlParams() {
    let params = {key: '', rid: ''};
    (window.location.search.substr(1).split('&') || [])
      .map(el => el.indexOf('rid=') === 0 || el.indexOf('key=') === 0
        ? Object.assign(params, {[el.split('=')[0]]: el.split('=')[1]})
        : null
      );
    return params;
  }

  getChildContext() {
    return {
      cancelRequest: this._doCancelRequest.bind(this),
      reload: this._doDataLoad.bind(this),
      urlParams: this.urlParams,
    };
  }

  componentDidMount() {
    this._doDataLoad();
  }

  _doDataLoad() {
    this.setState({view: 'loading'});
    axios.get(`${apiConstants.CANCELLATION_DATA_URL}?rid=${this.urlParams.rid}&key=${this.urlParams.key}`)
      .then(res => {
        let state = !res.data.errors.length
          ? 'pending' : 'denied';
        this.setState({
          view: state,
          data: res.data || {},
        });
      }).catch(err => {
        this.setState({
          view: 'denied'
        });
    });
  }

  _doCancelRequest() {
    axios.get(`${apiConstants.CANCELLATION_ACTION_URL}?rid=${this.urlParams.rid}&key=${this.urlParams.key}`)
      .then(res => {
        this.setState({
          view: 'done',
          data: null,
        });
      }).catch(err => {
        this.setState({
          view: 'fail',
          data: null,
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {{
            pending: (
              <CancellationPending data={this.state.data}/>
            ),
            done: (
              <CancellationConfirmed/>
            ),
            fail: (
              <CancellationFailed/>
            ),
            denied: (
              <CancellationDenied/>
            ),
            loading: (
              <Loader/>
            ),
          }[this.state.view]}
        </div>
      </div>
    );
  }
}

CancellationRoot.childContextTypes = {
  urlParams: PropTypes.object,
  reload: PropTypes.func,
  cancelRequest: PropTypes.func,
};

export default CancellationRoot;
