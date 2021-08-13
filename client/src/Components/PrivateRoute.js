//* React and React Router imports
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../Context";

//* Higher  order component for protected routes
const PrivateRoute = ({ children, ...rest }) => {
  const { authenticatedUser } = useContext(Context);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticatedUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
