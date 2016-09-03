# Internation CRM

The project has been deployed to [surge](http://antoniopuero.surge.sh)

## Expected api

The back end simulation is located in the `./src/server-mock`

### Users api

`GET '/api/users'`

```javascript
[
    ...
    {
      firstName: 'geoff',
      lastName: 'rose',
      email: 'geoff.rose@example.com',
      registered: '2013-09-02 12:19:55',
      phone: '011-060-2892',
      pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
      id: 'uniqueUserId2'
    },
    ...
]
```

`GET '/api/users/:id'`

```javascript
{
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
  groups: [{
    name: 'friends',
    id: 'uniqueGroupId1'
  }, {
    name: 'beauties',
    id: 'uniqueGroupId2'
  }]
}
```

`GET '/api/users/:id'`

```javascript
{
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
  groups: [{
    name: 'friends',
    id: 'uniqueGroupId1'
  }, {
    name: 'beauties',
    id: 'uniqueGroupId2'
  }]
}
```

`POST '/api/users/create'`

```javascript
{
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
}
```

`POST '/api/users/:id/delete'`

```javascript
{
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
}
```

Add a user to the group
`POST '/api/users/:id/group/:id/add'`

```javascript
{
  firstName: 'geoff',
  lastName: 'rose',
  email: 'geoff.rose@example.com',
  registered: '2013-09-02 12:19:55',
  phone: '011-060-2892',
  pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
  id: 'uniqueUserId2'
}
```

Delete a user from the group
`POST '/api/users/:id/group/:id/delete'`

```javascript
{
  groupId: 'groupId',
  userId: 'userId'
}
```

### Groups API

`GET '/api/groups'`

```javascript
[
    ...
    {
      name: 'friends',
      id: 'uniqueGroupId1'
    },
    ...
]
```

`GET '/api/groups/:id'`

```javascript
{
  name: 'friends',
  id: 'uniqueGroupId1',
  users: [
    {
      firstName: 'geoff',
      lastName: 'rose',
      email: 'geoff.rose@example.com',
      registered: '2013-09-02 12:19:55',
      phone: '011-060-2892',
      pictureUrl: 'https://randomuser.me/api/portraits/men/54.jpg',
      id: 'uniqueUserId2'
    },
    ...
  ]
}
```

`POST '/api/groups/:id/delete'

```javascript
{
  name: 'friends',
  id: 'uniqueGroupId1'
}
````

`POST '/api/groups/create'

```javascript
{
  name: 'friends',
  id: 'uniqueGroupId1'
}
````