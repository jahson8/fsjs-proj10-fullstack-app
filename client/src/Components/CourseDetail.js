//* React ,React Router and Context imports
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Context } from "../Context";

// * React Markdown import
import ReactMarkdown from "react-markdown";

// *Component Imports
import ActionsBar from "./ActionsBar";
import Modal from "./Modal";

const CourseDetail = () => {
  //*  context variables
  const { data, authenticatedUser, userPassword } = useContext(Context);

  // * Router hooks
  const history = useHistory();
  let { id } = useParams();

  // * State variables
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  // * Fetch the corresponding course
  useEffect(() => {
    data
      .getCourse(id)
      .then((res) => {
        if (res) {
          setCourse(res);
          setUser(res.userInfo);
        } else {
          history.push("/NotFound");
        }
      })
      .catch((error) => {
        console.log("Error fetching course", error);
        history.push("/error");
      });
  }, [data, id, history]);

  //* Delete course
  const deleteCourse = (evt) => {
    evt.preventDefault();
    data
      .deleteCourse(id, authenticatedUser[0].emailAddress, userPassword)
      .then(() => {
        history.push("/");
        console.log(`Course: ${course.title} successfully deleted`);
      })
      .catch((err) => {
        // handle rejected promises
        console.log("Error deleting course", err);
        history.push("/error");
      });
  };

  //* modal visibility functions
  const showModal = (evt) => {
    evt.preventDefault();
    setShow(true);
  };

  const hideModal = (evt) => {
    evt.preventDefault();
    setShow(false);
  };

  return (
    <main>
      {authenticatedUser && authenticatedUser[0].id === user.id ? (
        <ActionsBar handleShow={showModal} />
      ) : null}

      {}

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
      <Modal handleClose={hideModal} show={show} handleDelete={deleteCourse} />
    </main>
  );
};

export default CourseDetail;
