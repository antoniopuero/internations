import React from 'react';
import _ from 'lodash';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import store from './store/configureStore';

let routes = (
  <Route path="/" component={App}/>
);

function patchRoutes(route, store) {
  const { props: { component, children } } = route;

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
