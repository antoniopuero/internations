import React, {Component} from 'react';
import {connect} from 'react-redux';

class NotFound extends Component {

  render() {
      return (<h1>There is no such page</h1>);
  }
}
export default connect()(NotFound);
