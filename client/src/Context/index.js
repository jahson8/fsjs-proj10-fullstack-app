import React from "react";
import Data from "../Data/Data";

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();

  const signIn = async () => {};

  const signOut = () => {};

  const value = {
    data,
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
