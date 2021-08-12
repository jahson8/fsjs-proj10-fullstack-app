import React, { useState } from "react";
import Data from "../Data/Data";

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();

  // * State variables
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  // * Function to signin User
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(emailAddress, password);
    if (user !== null) {
      setAuthenticatedUser(user[0]);
    }
    return user;
  };

  // *
  const signOut = () => {
    setAuthenticatedUser(null);
  };

  const value = {
    authenticatedUser,
    data,
    actions: {
      signIn,
      signOut,
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
