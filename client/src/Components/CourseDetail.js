//* React and React Router imports
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../Context";

// * React Markdown
import ReactMarkdown from "react-markdown";

// *Component Imports
import ActionsBar from "./ActionsBar";

const CourseDetail = () => {
  //*  context variables
  const { data, authenticatedUser } = useContext(Context);

  // * ROuter hooks
  const history = useHistory();
  let { id } = useParams();

  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    data
      .getCourse(id)
      .then((res) => {
        if (res) {
          setCourse(res);
          setUser(res.userInfo);
        }
      })
      .catch((error) => {
        console.log("Error fetching course", error);
        history.push("/error");
      });
  }, [data, id, history]);
  return (
    <main>
      {authenticatedUser && authenticatedUser[0].id === user.id ? (
        <ActionsBar />
      ) : null}

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>{`By ${user.firstName} ${user.lastName}`}</p>
              <ReactMarkdown children={course.description} />
            </div>
            <div>
              {course.estimatedTime ? (
                <>
                  {" "}
                  <h3 className="course--detail--title">Estimated Time</h3>
                  <ReactMarkdown children={course.estimatedTime} />{" "}
                </>
              ) : null}

              {course.materialsNeeded ? (
                <>
                  {" "}
                  <h3 className="course--detail--title">Materials Needed</h3>
                  <ReactMarkdown
                    className="course--detail--list"
                    children={course.materialsNeeded}
                  />
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CourseDetail;
