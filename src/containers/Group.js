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
import {Link} from 'react-router';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Form from '../components/Form/Form';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

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

    const rightIconMenu = (user) => (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      >
        <MenuItem
          containerElement={<Link to={`/user/${user.id}`}/>}
        >
          View
        </MenuItem>
        <MenuItem
          onTouchTap={() => {
            this.props.removeUserFromGroup(user.id, group.id);
          }}
        >
          Delete from group
        </MenuItem>
      </IconMenu>
    );

    const actions = [
      <FlatButton
        label="Cancel"
        keyboardFocused
        onTouchTap={this.closeAddForm.bind(this)}
      />
    ];

    return (
      <div>
        <List>
          <Subheader>{group.name} users</Subheader>

          {group.users.map((user) => {
            return (
              <div key={user.id}>
                <ListItem
                  leftAvatar={<Avatar src={user.pictureUrl}/>}
                  primaryText={`${user.firstName} ${user.lastName}`}
                  secondaryText={
                    <p>
                      Email: {user.email}; Phone: {user.phone}
                    </p>
                  }
                  secondaryTextLines={1}
                  rightIconButton={rightIconMenu(user)}
                />
                <Divider/>
              </div>
            );
          })}
        </List>

        <FloatingActionButton
          onTouchTap={this.openAddForm.bind(this)}
          style={{
            position: 'fixed',
            bottom: '20px',
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
