const users = JSON.parse(localStorage.getItem('users'));
export default users || [{
  gender: 'female',
  name: {
    title: 'miss',
    first: 'peppi',
    last: 'jarvi'
  },
  location: {
    street: '7970 satakennankatu',
    city: 'pyhäranta',
    state: 'päijät-häme',
    postcode: 60678
  },
  email: 'peppi.jarvi@example.com',
  registered: '2014-12-13 07:25:09',
  phone: '06-812-193',
  picture: {
    large: 'https://randomuser.me/api/portraits/women/37.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/37.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/37.jpg'
  },
  id: 'uniqueUserId1'
}, {
  gender: 'male',
  name: {
    title: 'mr',
    first: 'geoff',
    last: 'rose'
  },
  location: {
    street: '5627 south street',
    city: 'wexford',
    state: 'donegal',
    postcode: 19321
  },
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  picture: {
    large: 'https://randomuser.me/api/portraits/men/54.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/54.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/54.jpg'
  },
  id: 'uniqueUserId2'
}, {
  gender: 'female',
  name: {
    title: 'miss',
    first: 'selma',
    last: 'kristensen'
  },
  location: {
    street: '7637 ådalen',
    city: 'stenderup',
    state: 'sjælland',
    postcode: 98993
  },
  email: 'selma.kristensen@example.com',
  registered: '2002-07-18 00:05:58',
  phone: '02915029',
  picture: {
    large: 'https://randomuser.me/api/portraits/women/22.jpg',
    medium: 'https://randomuser.me/api/portraits/med/women/22.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/women/22.jpg'
  },
  id: 'uniqueUserId3'
}];