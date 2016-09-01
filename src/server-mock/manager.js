import _ from 'lodash';
import initialGroups from './groupsCollection';
import initialUsers from './usersCollection';
import initialRelations from './usersGroupsRelation';

let groups = _.cloneDeep(initialGroups);
let users = _.cloneDeep(initialUsers);
let relations = _.cloneDeep(initialRelations);

const usersUrl = '/api/users';
const groupsUrl = '/api/groups';

function match(url, regex) {
  return url.match(new RegExp(_.escape(regex)));
}

function BadRequest(message) {
  return new Error({code: 400, message});
}

function retrieve({url, data}) {
  let userIndex,
    deletedUser,
    groupIndex,
    deletedGroup,
    existingRelations,
    existingRelationIndex;

  switch (true) {

    case match(url, `${usersUrl}/create`):
      const newUser = {
        id: _.uniqueId(),
        ...data
      };
      users.push(newUser);
      return newUser;

    case match(url, `${usersUrl}/.+?/group/.+?/add`):
      existingRelationIndex = _.findIndex(relations, {userId: data.userId, groupId: data.userId});

      if (existingRelationIndex >= 0) {
        throw BadRequest('User already exists in this group');
      }

      const newRelation = {
        id: _.uniqueId(),
        groupId: data.groupId,
        userId: data.userId
      };

      relations.push(newRelation);

      return;

    case match(url, `${usersUrl}/.+?/group/.+?/delete`):

      existingRelationIndex = _.findIndex(relations, {userId: data.userId, groupId: data.userId});

      if (existingRelationIndex < 0) {
        throw BadRequest('User doesn\'t exist in this group');
      }

      relations.splice(existingRelationIndex, 1);

      return;

    case match(url, `${usersUrl}/.+?/groups`):

      existingRelations = _.find(relations, {userId: data.userId});

      if (!existingRelations.length) {
        throw BadRequest('User doesn\'t exist in any group');
      }


      const foundGroups = _.filter(groups, (group) => {
        return _.findIndex(existingRelations, {groupId: group.id}) != 0;
      });

      return foundGroups;

    case match(url, `${usersUrl}/.+?/update`):
      userIndex = _.findIndex(users, {id: data.id});

      if (userIndex < 0) {
        throw BadRequest('no such user');
      }

      users[userIndex] = {
        ...users[userIndex],
        ..._.omit(data, 'id')
      };

      return users[userIndex];

    case match(url, `${usersUrl}/.+?/delete`):
      userIndex = _.findIndex(users, {id: data.id});
      deletedUser = users[userIndex];

      if (userIndex < 0) {
        throw BadRequest('no such user');
      }

      relations = _.filter(relations, (relation) => relation.groupId != data.id);

      users.splice(userIndex, 1);

      return deletedUser;

    case match(url, `${usersUrl}/.+?`):
      userIndex = _.findIndex(users, {id: data.id});

      if (userIndex < 0) {
        throw BadRequest('no such user');
      }

      return users[userIndex];

    case match(url, usersUrl):
      return users;


    case match(url, `${groupsUrl}/.+?/update`):
      groupIndex = _.findIndex(groups, {id: data.id});

      if (groupIndex < 0) {
        throw BadRequest('no such group');
      }

      groups[groupIndex] = {
        ...groups[groupIndex],
        ..._.omit(data, 'id')
      };

      return users[userIndex];

    case match(url, `${groupsUrl}/.+?/delete`):
      const groupRelation = _.find(relations, {groupId: data.id});
      groupIndex = _.findIndex(groups, {id: data.id});
      deletedGroup = groups[userIndex];

      if (groupIndex < 0) {
        throw BadRequest('no such group');
      }
      if (groupRelation.length) {
        throw BadRequest('Group could be deleted only when there is no user inside it');
      }

      groups.splice(groupIndex, 1);

      return deletedGroup;

    case match(url, `${groupsUrl}/.+?/users`):
      groupIndex = _.findIndex(groups, {id: data.id});
      existingRelations = _.find(relations, {groupId: data.id});

      if (groupIndex < 0) {
        throw BadRequest('no such group');
      }

      const foundUsers = _.filter(users, (user) => {
        return _.findIndex(existingRelations, {userId: user.id}) != 0;
      });

      return foundUsers;

    case match(url, `${groupsUrl}/.+?`):
      groupIndex = _.findIndex(groups, {id: data.id});

      if (groupIndex < 0) {
        throw BadRequest('no such group');
      }

      return groups[groupIndex];

    case match(url, groupsUrl):
      return groups;
  }
}

export default {
  get: retrieve,
  post: retrieve,
  patch: retrieve,
  det: retrieve
}
