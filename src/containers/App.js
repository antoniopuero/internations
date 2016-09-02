import React, { Component } from 'react';
import { Link } from 'react-router';
import {getUsers, getUser} from '../api/user';
import {connect} from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';


console.log(getUsers(), getUser('uniqueUserId1'));

class App extends Component {

  state = {
    showLeftNav: false
  };

  static onEnter(store, nextState, replaceState, callback) {
    console.log('here');
    callback();
  }

  handleToggle () {
    this.setState({showLeftNav: !this.state.showLeftNav});
  }

  handleClose () {
    this.setState({showLeftNav: false});
  }

  render() {
    const {history: {pushState}} = this.props;
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
        </Drawer>
      </div>
    );
  }
}

export default connect((store) => store, {})(App);
