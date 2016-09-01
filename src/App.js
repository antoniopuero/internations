import React, { Component } from 'react';
import {getUsers} from './api/user';


class App extends Component {
  render() {
    console.log(getUsers());
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
