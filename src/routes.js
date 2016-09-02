import React from 'react';
import _ from 'lodash';
import {Route} from 'react-router';
import App from './containers/App';
import Users from './containers/Users';
import User from './containers/User';
import CreateUser from './containers/CreateUser';
import Groups from './containers/Groups';
import Group from './containers/Group';
import CreateGroup from './containers/CreateGroup';
import NotFound from './containers/NotFound';

import store from './store/configureStore';

let routes = (
  <Route path="/" component={App}>
    <Route path="users" component={Users}/>
    <Route path="user">
      <Route path=":id" component={User}/>
      <Route path="create" component={CreateUser}/>
    </Route>
    <Route path="groups" component={Groups}/>
    <Route path="group">
      <Route path=":id" component={Group}/>
      <Route path="create" component={CreateGroup}/>
    </Route>

    <Route path="*" component={NotFound}/>

  </Route>
);

function patchRoutes (route, store) {
  const {props: {component, children}} = route;

  return {
    ...route,
    props: {
      ...route.props,
      onEnter: component && component.WrappedComponent.onEnter && function (nextState, replaceState, callback) {
        component.WrappedComponent.onEnter(store, nextState, replaceState, callback);
      },
      onLeave: component && component.WrappedComponent.onLeave && function () {
        component.WrappedComponent.onLeave(store);
      },
      children: children ? _.isArray(children) ? _.map(children, (r) => patchRoutes(r, store)) : patchRoutes(children, store) : null
    }
  };
}

routes = patchRoutes(routes, store);

export default routes;
