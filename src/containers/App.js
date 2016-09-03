import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import {red600} from 'material-ui/styles/colors';

class App extends Component {

  state = {
    showLeftNav: false
  };

  static onEnter(store, nextState, replaceState, callback) {
    callback();
  }

  drawerToggle () {
    this.setState({showLeftNav: !this.state.showLeftNav});
  }

  drawerClose () {
    this.setState({showLeftNav: false});
  }

  render() {
    const {globalError} = this.props;
    return (
      <div className="App">
        <AppBar
          title="Internations CRM"
          onLeftIconButtonTouchTap={this.drawerToggle.bind(this)}
        />
        <Drawer
          open={this.state.showLeftNav}
          onRequestChange={(showLeftNav) => this.setState({showLeftNav})}
          docked={false}
        >
          <AppBar
            showMenuIconButton={false}
          />
          <MenuItem
            onTouchTap={this.drawerClose.bind(this)}
            containerElement={<Link to="/users" />}
            primaryText="Users"
          />
          <MenuItem
            onTouchTap={this.drawerClose.bind(this)}
            containerElement={<Link to="/groups" />}
            primaryText="Groups"
          />
        </Drawer>

        <Snackbar
          open={!!globalError.message}
          bodyStyle={{
            backgroundColor: red600
          }}
          onRequestClose={this.props.clearGlobalError}
          message={globalError.message || ''}
          autoHideDuration={4000}
        />

        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default connect((store) => {
  const {globalError} = store;
  return {globalError};
}, {
  clearGlobalError () {
    return {
      type: 'GLOBAL_ERROR',
      message: ''
    };
  }
})(App);
