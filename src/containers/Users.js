import React, { Component } from 'react';
import { Link } from 'react-router';
import {getUsers, removeUser} from '../reducers/users';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';



class Users extends Component {

  static async onEnter(store, nextState, replaceState, callback) {
    await store.dispatch(getUsers());
    callback();
  }

  state = {
    showRemoveWarning: false
  };

  openRemoveWarning (id) {
    this.setState({showRemoveWarning: true, userToDeleteId: id});
  }

  closeRemoveWarning () {
    this.setState({showRemoveWarning: false, userToDeleteId: null});
  }

  render() {
    const {users: {list}} = this.props;


    const actions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
        onTouchTap={this.closeRemoveWarning.bind(this)}
      />,
      <FlatButton
        label="Delete"
        secondary
        onTouchTap={async () => {
          await this.props.removeUser(this.state.userToDeleteId);
          this.closeRemoveWarning();
        }}
      />
      ];

    return (
      <div>

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>View details</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {list.value.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.name.first} {user.name.last}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="View"
                      primary
                      containerElement={<Link to={`/user/${user.id}`}>view</Link>}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Remove"
                      secondary
                      onTouchTap={this.openRemoveWarning.bind(this, user.id)}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>


        <Dialog
          title="Are you sure about deleting this user?"
          actions={actions}
          modal={false}
          open={this.state.showRemoveWarning}
          onRequestClose={this.closeRemoveWarning.bind(this)}
        />

        </div>
    );
  }
}

export default connect((store) => {
  const {users} = store;
  return {users};
}, {
  removeUser
})(Users);
