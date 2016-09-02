import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from './DevTools';
import { Router, browserHistory } from 'react-router';
import routes from './routes';

export default class Root extends Component {

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router
            routes={routes}
            history={browserHistory}
          />
          {process.env.NODE_ENV === 'development' && <DevTools />}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
