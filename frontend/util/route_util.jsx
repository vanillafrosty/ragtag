import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Auth = ({component: Component, path, loggedIn, exact}) => {
  return (
    <Route path={path} exact={exact} render={ (props) => {
        return !loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    } />
  );
};

const Protected = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={(props) => (
     loggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    )
  )} />
);

const mapStateToProps = (state) => {
  return {
    loggedIn: Boolean(state.session.id)
  };
};



export const ProtectedRoute = withRouter(connect(mapStateToProps, null)(Protected));
export const AuthRoute = withRouter(connect(mapStateToProps, null)(Auth));
