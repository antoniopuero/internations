import React, { Component } from 'react';
import { Link } from 'react-router';
import {getUsers} from '../reducers/users';
import {connect} from 'react-redux';



class Users extends Component {

  static async onEnter(store, nextState, replaceState, callback) {
    await store.dispatch(getUsers());
    callback();
  }

  render() {
    const {users: {list}} = this.props;

    console.log(list);
    return (
      <div>
        {list.value.map((user) => {
          return <div>{user.name.first} {user.name.last}</div>;
        })}

        </div>
    );
  }
}

export default connect((store) => {
  const {users} = store;
  return {users};
}, {})(Users);
