import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  const prevLocation = rest.location.pathname;

  return (
    <Route {...rest} render={function(props) {
      return (
        rest.loggedIn
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: prevLocation
          }} />
      )}
    } />
  );
}

export default withRouter(ProtectedRoute);