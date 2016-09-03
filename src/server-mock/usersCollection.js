const users = JSON.parse(localStorage.getItem('users'));
export default users || [{
  firstName: 'peppi',
  lastName: 'jarvi',
  email: 'peppi.jarvi@example.com',
  registered: '2014-12-13 07:25:09',
  phone: '06-812-193',
  pictureUrl: 'https://randomuser.me/api/portraits/women/37.jpg',
  id: 'uniqueUserId1'
}, {
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
}, {
  firstName: 'selma',
  lastName: 'kristensen',
  email: 'selma.kristensen@example.com',
  registered: '2002-07-18 00:05:58',
  phone: '02915029',
  pictureUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
  id: 'uniqueUserId3'
}];