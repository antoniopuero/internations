import React, { Component } from 'react';
import { Link } from 'react-router';
import {getGroups, removeGroup} from '../reducers/groups';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';



class Groups extends Component {

  static async onEnter(store, nextState, replaceState, callback) {
    await store.dispatch(getGroups());
    callback();
  }

  state = {
    showRemoveWarning: false
  };

  openRemoveWarning (id, e) {
    e.preventDefault();
    this.setState({showRemoveWarning: true, groupToDeleteId: id});
  }

  closeRemoveWarning () {
    this.setState({showRemoveWarning: false, groupToDeleteId: null});
  }

  render() {
    const {groups: {list}} = this.props;


    const rightIconMenu = (group) => (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
      >
        <MenuItem
          containerElement={<Link to={`/group/${group.id}`}/>}
        >
          View
        </MenuItem>
        <MenuItem
          onTouchTap={this.openRemoveWarning.bind(this, group.id)}
        >
          Delete
        </MenuItem>
      </IconMenu>
    );

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
          await this.props.removeGroup(this.state.groupToDeleteId);
          this.closeRemoveWarning();
        }}
      />
    ];

    return (
      <div>


        <List>
          <Subheader>Users</Subheader>

          {list.value.map((group) => {
            return (
              <div key={group.id}>
                <ListItem
                  primaryText={group.name}
                  secondaryText={<p>ID: {group.id}</p>}
                  secondaryTextLines={1}
                  rightIconButton={rightIconMenu(group)}
                />
                <Divider inset/>
              </div>
            );
          })}
        </List>


        <FloatingActionButton
          containerElement={<Link to={'/group/create'}/>}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Dialog
          title="Are you sure about deleting this group?"
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
  const {groups} = store;
  return {groups};
}, {
  removeGroup
})(Groups);
