import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import DevTools from './containers/DevTools';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

export default class Root extends Component {

  render () {
    const {store} = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <div>
            <Router
              routes={routes}
              history={browserHistory}
            />
            {process.env.NODE_ENV === 'development' && <DevTools />}
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};
