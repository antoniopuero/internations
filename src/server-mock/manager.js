import _ from 'lodash';
import initialGroups from './groupsCollection';
import initialUsers from './usersCollection';
import initialRelations from './usersGroupsRelation';

let groups = _.cloneDeep(initialGroups);
let users = _.cloneDeep(initialUsers);
let relations = _.cloneDeep(initialRelations);

const usersUrl = '/api/users';
const groupsUrl = '/api/groups';
const paramRegex = '([^\/]+?)';

class BadRequest extends Error {
  constructor (message) {
    super(message);
    this.status = 400;
  }
}

class NotFound extends Error {
  constructor (message) {
    super(message);
    this.status = 404;
  }
}

function updateStorage (name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

const routes = [() => {
  throw new NotFound('Not Found');
}];

function defineRoute(routeRegex, callback) {
  const finalRouteRegex = new RegExp(_.escape(`^${routeRegex}$`));
  const previousRouteIndex = routes.length - 1;
  routes.push((url, data) => {
    const params = url.match(finalRouteRegex);
    if (params) {
      return callback(data, params);
    } else {
      return routes[previousRouteIndex] && routes[previousRouteIndex](url, data);
    }
  });
}

defineRoute(`${usersUrl}/${paramRegex}`, (data, params) => {
  const id = params[1];
  const userIndex = _.findIndex(users, {id});
  const existingRelations = _.filter(relations, {userId: id});

  if (userIndex < 0) {
    throw new BadRequest('no such user');
  }

  const userGroups =  _.filter(groups, (group) => {
    return _.findIndex(existingRelations, {groupId: group.id}) !== -1;
  });

  return {
    ...users[userIndex],
    groups: userGroups
  };
});

defineRoute(`${usersUrl}/create`, (data) => {
  const newUser = {
    id: _.uniqueId(`user${Date.now()}`),
    registered: (new Date),
    ..._.omit(data, ['groupId', 'id'])
  };
  users.push(newUser);
  updateStorage('users', users);
  const newRelation = {
    id: _.uniqueId(`relation${Date.now()}`),
    userId: newUser.id,
    groupId: data.groupId
  };
  relations.push(newRelation);
  updateStorage('relations', relations);
  return newUser;
});

defineRoute(`${usersUrl}/${paramRegex}/group/${paramRegex}/add`, (data, params) => {
  const userId = params[1], groupId = params[2];
  const existingRelationIndex = _.findIndex(relations, {userId, groupId});

  if (existingRelationIndex >= 0) {
    throw new BadRequest('User already exists in this group');
  }
  const newRelation = {
    id: _.uniqueId(`relation${Date.now()}`),
    groupId,
    userId
  };

  relations.push(newRelation);
  updateStorage('relations', relations);

  return _.find(users, {id: userId});
});

defineRoute(`${usersUrl}/${paramRegex}/group/${paramRegex}/delete`, (data, params) => {
  const userId = params[1], groupId = params[2];
  const existingRelationIndex = _.findIndex(relations, {userId, groupId});
  const userGroups = _.filter(relations, {userId});

  if (userGroups.length === 1) {
    throw new BadRequest('User should belong at least to one group');
  }

  if (existingRelationIndex < 0) {
    throw new BadRequest('User doesn\'t exist in this group');
  }

  relations.splice(existingRelationIndex, 1);
  updateStorage('relations', relations);

  return {userId, groupId};
});

defineRoute(`${usersUrl}/${paramRegex}/delete`, (data, params) => {
  const id = params[1];
  const userIndex = _.findIndex(users, {id});
  const userToDelete = users[userIndex];

  if (userIndex < 0) {
    throw new BadRequest('no such user');
  }

  relations = _.filter(relations, (relation) => relation.userId !== id);
  updateStorage('relations', relations);

  users.splice(userIndex, 1);
  updateStorage('users', users);
  return userToDelete;

});

defineRoute(usersUrl, () => {
  return users;
});


defineRoute(`${groupsUrl}/${paramRegex}`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});
  const existingRelations = _.filter(relations, {groupId: id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  const groupUsers =  _.filter(users, (user) => {
    return _.findIndex(existingRelations, {userId: user.id}) !== -1;
  });

  return {
    ...groups[groupIndex],
    users: groupUsers
  };
});

defineRoute(`${groupsUrl}/create`, (data) => {

  if (_.findIndex(groups, {name: data.name}) !== -1) {
    throw BadRequest('such group already exists');
  }
  const newGroup = {
    id: _.uniqueId(`group${Date.now()}`),
    ..._.omit(data, 'id')
  };
  groups.push(newGroup);
  updateStorage('groups', groups);
  return newGroup;
});

defineRoute(`${groupsUrl}/${paramRegex}/delete`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});
  const groupToDelete = groups[groupIndex];
  const groupRelation = _.filter(relations, {groupId: id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  if (groupRelation.length) {
    throw new BadRequest('Group could be deleted only when there is no user inside it');
  }

  groups.splice(groupIndex, 1);
  updateStorage('groups', groups);
  return groupToDelete;
});

defineRoute(groupsUrl, () => {
  return groups;
});

function retrieve ({url, data}) {
  return routes[routes.length - 1](url, data);
}

export default {
  get: retrieve,
  post: retrieve,
  patch: retrieve,
  del: retrieve
};
