import React, {Component} from 'react';
import {
  getGroup,
  addUserToGroup,
  changeUserToAdd,
  changeUserToAddError,
  clearUserToAdd
} from '../reducers/groups';
import {getUsers, removeUserFromGroup} from '../reducers/users';
import _ from 'lodash';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Form from '../components/Form/Form';
import Avatar from 'material-ui/Avatar';
import List from '../components/List/List';
import AddButton from '../components/AddButton/AddButton';

class Group extends Component {

  static onEnter (store, nextState, replaceState, callback) {
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


  render () {
    const {groups: {group: {value: group}, userToAdd}, users: {list}} = this.props;
    const usersThatAreNotInTheGroup = _.xorBy(group.users, list.value, 'id');

    const userToAddFields = [{
      inputType: 'select',
      name: 'userId',
      label: 'User to add',
      options: _.map(usersThatAreNotInTheGroup, (user) => {
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

        <List
          headerText={`${group.name} users`}
          items={group.users}
          menuItemProps={{
            leftAvatar: (user) => <Avatar src={user.pictureUrl}/>,
            primaryText: (user) => `${user.firstName} ${user.lastName}`,
            secondaryText: (user) => <p>Email: {user.email}; Phone: {user.phone}</p>,
            secondaryTextLines: 1
          }}
          baseLink="/user"
          removeText="Delete user from group"
          onDelete={(id) => {
            this.props.removeUserFromGroup(id, group.id);
          }}
        />

        {!!usersThatAreNotInTheGroup.length &&
        <AddButton
          onAdd={this.openAddForm.bind(this)}
        />}


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
