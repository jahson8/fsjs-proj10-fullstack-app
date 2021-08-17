//* React React Router imports
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams, useHistory } from "react-router-dom";
import { Context } from "../Context";

const ActionsBar = ({ handleShow }) => {
  // * state
  const [creatorId, setCreatorId] = useState("");

  // * context variables
  const { authenticatedUser, data } = useContext(Context);

  // * Router hooks variables
  let { pathname } = useLocation();
  let { id } = useParams();
  const history = useHistory();

  // * fetch userInfo
  useEffect(() => {
    data
      .getCourse(id)
      .then((res) => {
        if (res) setCreatorId(res.userId);
      })
      .catch((error) => {
        console.log("Error fetching course", error);
        history.push("/error");
      });
  }, [data, id, history]);

  return (
    <div className="actions--bar">
      <div className="wrap">
        {authenticatedUser && authenticatedUser[0].id === creatorId ? (
          <>
            {" "}
            <Link className="button" to={pathname + "/update"}>
              Update Course
            </Link>
            <Link className="button" onClick={handleShow}>
              Delete Course
            </Link>{" "}
          </>
        ) : null}

        <Link className="button button-secondary" to="/">
          Return to List
        </Link>
      </div>
    </div>
  );
};

export default ActionsBar;
