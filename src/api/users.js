import server from '../server-mock';

const baseUrl = '/api/users';

export function getUsers() {
  return server.get({url: baseUrl});
}

export function getUser({params}) {
  return server.get({url: `${baseUrl}/${params.id}`});
}

export function createUser({data}) {
  return server.post({url: `${baseUrl}/create`, data});
}

export function removeUser({params}) {
  return server.post({url: `${baseUrl}/${params.id}/delete`});
}

export function removeUserFromGroup({params}) {
  return server.post({url: `${baseUrl}/${params.userId}/group/${params.groupId}/delete`});
}
export function addUserToGroup({params}) {
  return server.post({url: `${baseUrl}/${params.userId}/group/${params.groupId}/add`});
}