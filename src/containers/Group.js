import React, { Component } from 'react';
import {getGroup,
  addUserToGroup,
  changeUserToAdd,
  changeUserToAddError,
  clearUserToAdd
} from '../reducers/groups';
import {getUsers, removeUserFromGroup} from '../reducers/users';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Form from '../components/Form/Form';

class Group extends Component {

  static onEnter(store, nextState, replaceState, callback) {
    const {params: {id}} = nextState;
    store.dispatch(getGroup(id));
    store.dispatch(getUsers());
    callback();
  }

  state = {
    showAddForm: false
  };

  openAddForm (id) {
    this.setState({showAddForm: true, userToDeleteId: id});
  }

  closeAddForm () {
    this.setState({showAddForm: false, userToDeleteId: null});
  }


  render() {
    const {groups: {group: {value: group}, userToAdd}, users: {list}} = this.props;

    const userToAddFields = [{
      inputType: 'select',
      name: 'userId',
      label: 'User to add',
      options: _.map(_.xorBy(group.users, list.value, 'id'), (user) => {
        return {name: `${user.firstName} ${user.lastName}`, value: user.id};
      }),
      rules: {
        required: true
      }
    }];


    const actions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
        onTouchTap={this.closeAddForm.bind(this)}
      />
    ];

    return (
      <div>
        <h3
          style={{
            textAlign: 'center'
          }}
        >
          {group.name}
        </h3>
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Remove from group</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {group.users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableRowColumn>{user.id}</TableRowColumn>
                  <TableRowColumn>{user.firstName} {user.lastName}</TableRowColumn>
                  <TableRowColumn>{user.email}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Remove"
                      secondary
                      onTouchTap={() => {
                        this.props.removeUserFromGroup(user.id, group.id);
                      }}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <FloatingActionButton
          onTouchTap={this.openAddForm.bind(this)}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '20px'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>


        <Dialog
          title="Add one of the users to the group"
          actions={actions}
          modal={false}
          open={this.state.showAddForm}
          onRequestClose={this.closeAddForm.bind(this)}
        >
          <Form
            onChange={this.props.changeUserToAdd}
            onError={this.props.changeUserToAddError}
            onSubmit={async () => {
              await this.props.addUserToGroup();
              this.props.clearUserToAdd();
              this.closeAddForm();
            }}
            fields={userToAddFields}
            formData={userToAdd.value}
            formErrors={userToAdd.errors}
            formStatus={userToAdd.addStatus}
            submitText="Add user to group"
          />
        </Dialog>
      </div>
    );
  }
}

export default connect((store) => {
  return store;
}, {
  removeUserFromGroup,
  addUserToGroup,
  changeUserToAdd,
  changeUserToAddError,
  clearUserToAdd
})(Group);
