import React, { useState } from "react";
import Data from "../Data/Data";

// import universal cookie library
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const Context = React.createContext();

export const Provider = (props) => {
  const data = new Data();

  // * State variables
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookies.get("authenticatedUser") || null
  );

  // * Function to signin User
  const signIn = async (emailAddress, password) => {
    const user = await data.getUser(emailAddress, password);
    if (user !== null) {
      setAuthenticatedUser(user);
    }
    // Set cookies
    cookies.set("authenticatedUser", user, { path: "/" });

    return user;
  };

  // *
  const signOut = () => {
    setAuthenticatedUser(null);
    cookies.remove("authenticatedUser", { path: "/" });
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
