import server from '../server-mock';
export function getUsers() {
  return server.get({url: '/api/users'});
}

export function getUser({params}) {
  return server.get({url: `/api/users/${params.id}`});
}

export function removeUser({params}) {
  return server.post({url: `/api/users/${params.id}/delete`});
}