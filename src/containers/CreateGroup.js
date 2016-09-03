import React, { Component } from 'react';
import {
  changeGroupToCreate,
  changeGroupToCreateError,
  createGroup
} from '../reducers/groups';
import Form from '../components/Form/Form';
import {connect} from 'react-redux';

class CreateGroup extends Component {

  static onEnter(store, nextState, replaceState, callback) {
    callback();
  }

  render() {
    const {props} = this;
    const {groups: {groupToCreate}} = props;

    const fields = [{
      label: 'Group name',
      name: 'name',
      rules: {
        required: true,
        maxLength: 40
      }
    }];

    return (
      <div>
        <Form
          onChange={props.changeGroupToCreate}
          onError={props.changeGroupToCreateError}
          onSubmit={props.createGroup}
          fields={fields}
          formData={groupToCreate.value}
          formErrors={groupToCreate.errors}
          formStatus={groupToCreate.createStatus}
          navigateTo={`/group/${groupToCreate.value.id}`}
          navigateToText="View group"
          submitText="Create group"
        />
      </div>
    );
  }
}

export default connect((store) => {
  const {groups} = store;
  return {groups};
}, {
  changeGroupToCreate,
  changeGroupToCreateError,
  createGroup
})(CreateGroup);
