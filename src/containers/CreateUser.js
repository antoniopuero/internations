import React, { Component } from 'react';
import _ from 'lodash';
import {
  changeUserToCreate,
  changeUserToCreateError,
  createUser
} from '../reducers/users';
import {getGroups} from '../reducers/groups';
import Form from '../components/Form/Form';
import {connect} from 'react-redux';

class CreateUser extends Component {

  static onEnter(store, nextState, replaceState, callback) {
    store.dispatch(getGroups());
    callback();
  }

  render() {
    const {props} = this;
    const {users: {userToCreate}, groups: {list}} = props;

    const fields = [{
      label: 'First name',
      name: 'firstName',
      rules: {
        required: true,
        maxLength: 40
      }
    }, {
      label: 'Last name',
      name: 'lastName',
      rules: {
        required: true,
        maxLength: 40
      }
    }, {
      label: 'Profile picture url',
      name: 'pictureUrl',
      rules: {
        required: true,
        type: 'url'
      }
    }, {
      label: 'Phone number',
      name: 'phone',
      pattern: /^[0-9 ()+.-]+$/,
      rules: {
        required: true,
        type: 'phone'
      }
    }, {
      label: 'email',
      name: 'email',
      rules: {
        required: true,
        type: 'email'
      }
    }, {
      label: 'group',
      inputType: 'select',
      name: 'groupId',
      options: _.map(list.value, (group) => {
        return {name: group.name, value: group.id};
      }),
      rules: {
        required: true
      }
    }];

    return (
      <div>
        <Form
          onChange={props.changeUserToCreate}
          onError={props.changeUserToCreateError}
          onSubmit={props.createUser}
          fields={fields}
          formData={userToCreate.value}
          formErrors={userToCreate.errors}
          formStatus={userToCreate.createStatus}
          navigateTo={`/user/${userToCreate.value.id}`}
          navigateToText="View user"
          submitText="Create user"
        />
      </div>
    );
  }
}

export default connect((store) => {
  const {users, groups} = store;
  return {users, groups};
}, {
  changeUserToCreate,
  changeUserToCreateError,
  createUser
})(CreateUser);
