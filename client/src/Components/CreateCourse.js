//* React React Router and Context imports
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../Context";

// *Component imports
import ErrorDisplay from "./ErrorDisplay";

const CreateCourse = () => {
  // * Get context
  const { data, authenticatedUser, userPassword } = useContext(Context);
  const authUser = authenticatedUser[0];

  //* State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterials] = useState("");
  const [errors, setErrors] = useState([]);

  const { emailAddress } = authUser;
  const { firstName } = authUser;
  const { lastName } = authUser;

  // * get access to browser history
  const history = useHistory();

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
    // * New Course payload
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    // * add course funtionality
    data
      .createCourse(course, emailAddress, userPassword)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          console.log(`Course: ${title} successfully created`);
          history.push(`/`);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
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

              <p>{`By ${firstName} ${lastName}`}</p>

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
            Create Course
          </button>
          <button
            className="button button-secondary"
            onClick={() => history.push("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateCourse;
