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
  console.log(url, regex);
  return url.match(new RegExp(_.escape(`^${regex}$`)));
}

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

const routes = [() => {
  throw new NotFound('Not Found');
}];

function defineRoute(routeRegex, callback) {
  const previousRouteIndex = routes.length - 1;
  routes.push((url, data) => {
    const params = match(url, routeRegex);
    if (params) {
      return callback(data, params);
    } else {
      return routes[previousRouteIndex] && routes[previousRouteIndex](url, data);
    }
  });
}

defineRoute(`${usersUrl}/create`, (data) => {
  const newUser = {
    id: _.uniqueId('user'),
    ...data
  };
  users.push(newUser);
  return newUser;
});

defineRoute(`${usersUrl}/(.+?)/group/(.+?)/add`, (data, params) => {
  const userId = params[1], groupId = params[2];
  const existingRelationIndex = _.findIndex(relations, {userId, groupId});

  if (existingRelationIndex >= 0) {
    throw new BadRequest('User already exists in this group');
  }
  const newRelation = {
    id: _.uniqueId('relation'),
    groupId,
    userId
  };

  relations.push(newRelation);

  return {};
});

defineRoute(`${usersUrl}/(.+?)/group/(.+?)/delete`, (data, params) => {
  const userId = params[1], groupId = params[2];
  const existingRelationIndex = _.findIndex(relations, {userId, groupId});

  if (existingRelationIndex < 0) {
    throw new BadRequest('User doesn\'t exist in this group');
  }

  relations.splice(existingRelationIndex, 1);

  return {};
});

defineRoute(`${usersUrl}/(.+?)/groups`, (data, params) => {
  const userId = params[1];
  const existingRelations = _.find(relations, {userId});

  return  _.filter(groups, (group) => {
    return _.findIndex(existingRelations, {groupId: group.id}) !== 0;
  });
});

defineRoute(`${usersUrl}/(.+?)/update`, (data, params) => {
  const id = params[1];
  const userIndex = _.findIndex(users, {id});

  if (userIndex < 0) {
    throw new BadRequest('no such user');
  }

  users[userIndex] = {
    ...users[userIndex],
    ..._.omit(data, 'id')
  };

  return users[userIndex];

});

defineRoute(`${usersUrl}/(.+?)/delete`, (data, params) => {
  const id = params[1];
  const userIndex = _.findIndex(users, {id});
  const userToDelete = users[userIndex];

  if (userIndex < 0) {
    throw new BadRequest('no such user');
  }

  relations = _.filter(relations, (relation) => relation.userId !== id);

  users.splice(userIndex, 1);

  return userToDelete;

});

defineRoute(`${usersUrl}/(.+?)`, (data, params) => {
  const id = params[1];
  const userIndex = _.findIndex(users, {id});

  if (userIndex < 0) {
    throw new BadRequest('no such user');
  }

  return users[userIndex];
});

defineRoute(usersUrl, () => {
  return users;
});

defineRoute(`${groupsUrl}/create`, (data) => {
  const newGroup = {
    id: _.uniqueId('group'),
    ...data
  };
  groups.push(newGroup);
  return newGroup;
});

defineRoute(`${groupsUrl}/(.+?)/update`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  groups[groupIndex] = {
    ...groups[groupIndex],
    ..._.omit(data, 'id')
  };

  return groups[groupIndex];
});

defineRoute(`${groupsUrl}/(.+?)/delete`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});
  const groupToDelete = groups[groupIndex];
  const groupRelation = _.find(relations, {groupId: id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  if (groupRelation.length) {
    throw new BadRequest('Group could be deleted only when there is no user inside it');
  }

  groups.splice(groupIndex, 1);

  return groupToDelete;
});

defineRoute(`${groupsUrl}/(.+?)/users`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});
  const existingRelations = _.find(relations, {groupId: id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  return _.filter(users, (user) => {
    return _.findIndex(existingRelations, {userId: user.id}) !== 0;
  });
});

defineRoute(`${groupsUrl}/(.+?)`, (data, params) => {
  const id = params[1];
  const groupIndex = _.findIndex(groups, {id});

  if (groupIndex < 0) {
    throw new BadRequest('no such group');
  }

  return groups[groupIndex];
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
}
