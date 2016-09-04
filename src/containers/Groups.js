import React, { Component } from 'react';
import {getGroups, removeGroup} from '../reducers/groups';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import AddButton from '../components/AddButton/AddButton';
import List from '../components/List/List';



class Groups extends Component {

  static async onEnter(store, nextState, replaceState, callback) {
    await store.dispatch(getGroups());
    callback();
  }

  state = {
    showRemoveWarning: false
  };

  openRemoveWarning (id) {
    this.setState({showRemoveWarning: true, groupToDeleteId: id});
  }

  closeRemoveWarning () {
    this.setState({showRemoveWarning: false, groupToDeleteId: null});
  }

  render() {
    const {groups: {list}} = this.props;

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


        <List
          headerText={'Groups'}
          items={list.value}
          menuItemProps={{
            primaryText: (group) => group.name,
            secondaryText: (group) => <p>ID: {group.id}</p>,
            secondaryTextLines: 1
          }}
          baseLink="/group"
          onDelete={(id) => this.openRemoveWarning(id)}
        />

        <AddButton
          navigateTo="/group/create"
        />

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
