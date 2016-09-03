import React, { Component } from 'react';
import { Link } from 'react-router';
import {getGroups, removeGroup} from '../reducers/groups';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';



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

        <FloatingActionButton
          containerElement={<Link to={'/group/create'}/>}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '20px'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>View details</TableHeaderColumn>
              <TableHeaderColumn>Remove</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
          >
            {list.value.map((group) => {
              return (
                <TableRow key={group.id}>
                  <TableRowColumn>{group.id}</TableRowColumn>
                  <TableRowColumn>{group.name}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="View"
                      primary
                      containerElement={<Link to={`/group/${group.id}`}>view</Link>}
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Remove"
                      secondary
                      onTouchTap={this.openRemoveWarning.bind(this, group.id)}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>


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
