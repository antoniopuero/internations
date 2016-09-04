import React, {Component} from 'react';
import {getUsers, removeUser} from '../reducers/users';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Avatar from 'material-ui/Avatar';
import List from '../components/List/List';
import AddButton from '../components/AddButton/AddButton';


class Users extends Component {

  static async onEnter (store, nextState, replaceState, callback) {
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

  render () {
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

        <List
          headerText={'Users'}
          items={list.value}
          menuItemProps={{
            leftAvatar: (user) => <Avatar src={user.pictureUrl}/>,
            primaryText: (user) => `${user.firstName} ${user.lastName}`,
            secondaryText: (user) => <p>Email: {user.email}; Phone: {user.phone}</p>,
            secondaryTextLines: 1
          }}
          baseLink="/user"
          onDelete={(id) => this.openRemoveWarning(id)}
        />

        <AddButton
          navigateTo="/user/create"
        />

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
