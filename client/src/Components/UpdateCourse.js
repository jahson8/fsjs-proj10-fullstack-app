//* React React Router and Context imports
import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router";
import { Context } from "../Context";

// * Component imports
import ErrorDisplay from "./ErrorDisplay";

const UpdateCourse = () => {
  // * State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterials] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [errors, setErrors] = useState([]);

  // * context variables
  const { data, authenticatedUser, userPassword } = useContext(Context);
  const authUserId = authenticatedUser[0].id;
  const { emailAddress } = authenticatedUser[0];

  //* Router hooks
  const { id } = useParams();
  const history = useHistory();

  // * fetch the course to update
  useEffect(() => {
    data
      .getCourse(id)
      .then((res) => {
        if (res) {
          if (res.userId === authUserId) {
            setTitle(res.title);
            setDescription(res.description);
            setEstimatedTime(res.estimatedTime);
            setMaterials(res.materialsNeeded);
            setUserInfo(res.userInfo);
            setIsloading(false);
          } else {
            history.push("/forbidden");
          }
        } else {
          history.push("/NotFound");
        }
      })
      .catch((error) => {
        console.log("Error fetching course", error);
        history.push("/error");
      });
  }, [id, data, history, authUserId]);

  //* input event handler
  const handleValueChange = (evt) => {
    const target = evt.target;
    const name = target.name;
    const value = target.value;

    switch (name) {
      case "courseTitle":
        setTitle(value);
        break;
      case "courseDescription":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      default:
        setMaterials(value);
    }
  };

  // * Handle form submission
  const handleSubmit = () => {
    // * course payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // * update course functionality
    data
      .updateCourse(course, id, emailAddress, userPassword)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`Course: ${title} successfully updated`);
          history.push(`/courses/${id}`);
        }
      })
      .catch((err) => {
        // handle rejected promises
        console.log("Error with course update", err);
        history.push("/error");
      });
  };

  return (
    <main>
      <div className="wrap">
        {isLoading ? (
          <>
            <h2>Loading....</h2>
          </>
        ) : (
          <>
            {" "}
            <h2>Update Course</h2>
            {errors.length ? <ErrorDisplay errors={errors} /> : null}
            <form
              onSubmit={(evt) => {
                evt.preventDefault();
                handleSubmit();
              }}
            >
              <div className="main--flex">
                <div>
                  <label htmlFor="courseTitle">Course Title</label>
                  <input
                    id="courseTitle"
                    name="courseTitle"
                    type="text"
                    value={title}
                    onChange={handleValueChange}
                  />

                  <p>{`By ${userInfo.firstName} ${userInfo.lastName}`}</p>

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={description}
                    onChange={handleValueChange}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    value={estimatedTime}
                    onChange={handleValueChange}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    value={materialsNeeded}
                    onChange={handleValueChange}
                  ></textarea>
                </div>
              </div>
              <button className="button" type="submit">
                Update Course
              </button>
              <button
                className="button button-secondary"
                onClick={() => history.push(`/courses/${id}`)}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default UpdateCourse;
