const groups = JSON.parse(localStorage.getItem('groups'));
export default groups || [{
  name: 'friends',
  id: 'uniqueGroupId1'
}, {
  name: 'beauties',
  id: 'uniqueGroupId2'
}, {
  name: 'rednecks',
  id: 'uniqueGroupId3'
}];