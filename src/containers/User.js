import React, { Component } from 'react';
import {getUser, removeUserFromGroup} from '../reducers/users';
import {connect} from 'react-redux';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Chip from 'material-ui/Chip';


const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

class Users extends Component {

  static onEnter(store, nextState, replaceState, callback) {
    const {params: {id}} = nextState;
    store.dispatch(getUser(id));
    callback();
  }

  render() {
    const {users: {user: {value: user}}, history: {pushState}} = this.props;

    return (
      <div>
        <Paper
          style={{
            maxWidth: '600px',
            margin: '20px auto'
          }}
        >
          <List>
            <ListItem
              leftAvatar={<Avatar src={user.pictureUrl} />}
            >
              {user.firstName} {user.lastName}
            </ListItem>
            <ListItem>
              Email: {user.email}
            </ListItem>
            <ListItem>
              Registered: {user.registered}
            </ListItem>
            <ListItem>
              Phone: {user.phone}
            </ListItem>
          </List>

          <div style={styles.wrapper}>
            {user.groups.map((group) => {
              return (
                <Chip
                  key={group.id}
                  onRequestDelete={() => {
                    this.props.removeUserFromGroup(user.id, group.id);
                  }}
                  onTouchTap={() => {
                    pushState(null, `/group/${group.id}`);
                  }}
                  style={styles.chip}
                >
                  {group.name}
                </Chip>
              );
            })}
        </div>
        </Paper>
      </div>
    );
  }
}

export default connect((store) => {
  const {users} = store;
  return {users};
}, {
  removeUserFromGroup
})(Users);
