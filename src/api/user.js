import server from '../server-mock';
export function getUsers() {
  return server.post({url: '/api/users'});
}

export function getUser(id) {
  return server.post({url: `/api/users/${id}`});
}