import React, { Component } from 'react';
import {getUsers, getUser} from './api/user';
import {connect} from 'react-redux';


console.log(getUsers(), getUser('uniqueUserId1'));

class App extends Component {
  render() {
    return (
      <div className="App">
      </div>
    );
  }
}

export default connect((store) => store, {})(App);
