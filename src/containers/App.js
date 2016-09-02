import React, { Component } from 'react';
import { Link } from 'react-router';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

class App extends Component {

  state = {
    showLeftNav: false
  };

  static onEnter(store, nextState, replaceState, callback) {
    callback();
  }

  handleToggle () {
    this.setState({showLeftNav: !this.state.showLeftNav});
  }

  handleClose () {
    this.setState({showLeftNav: false});
  }

  render() {
    return (
      <div className="App">
        <AppBar
          title="Internations CRM"
          onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
        />
        <Drawer
          open={this.state.showLeftNav}
        >
          <MenuItem
            onTouchTap={this.handleClose.bind(this)}
            containerElement={<Link to="/users" />}
            primaryText="Users"
          />
          <MenuItem
            onTouchTap={this.handleClose.bind(this)}
            containerElement={<Link to="/groups" />}
            primaryText="Groups"
          />
        </Drawer>

        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default connect((store) => store, {})(App);
