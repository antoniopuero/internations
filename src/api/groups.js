import server from '../server-mock';

const baseUrl = '/api/groups';

export function getGroups() {
  return server.get({url: baseUrl});
}

export function getGroup({params}) {
  return server.get({url: `${baseUrl}/${params.id}`});
}

export function removeGroup({params}) {
  return server.post({url: `${baseUrl}/${params.id}/delete`});
}

export function createGroup({data}) {
  return server.post({url: `${baseUrl}/create`, data});
}