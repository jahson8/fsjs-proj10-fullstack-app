//* React and React Router imports
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Consumer } from "../Context";

//* Higher  order component for protected routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Route
          {...rest}
          render={(props) =>
            context.authenticateUser ? (
              <Component {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
      )}
    </Consumer>
  );
};

export default PrivateRoute;
