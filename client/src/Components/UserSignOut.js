//* React and React Router imports
import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../Context";

const UserSignOut = () => {
  const { actions } = useContext(Context);

  useEffect(() => actions.signOut());

  return <Redirect to="/" />;
};

export default UserSignOut;
