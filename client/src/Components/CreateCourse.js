//* React and React Router imports
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Context } from "../Context";

// *Component imports
import ErrorDisplay from "./ErrorDisplay";

const CreateCourse = () => {
  // * Get context
  const { data, authenticatedUser } = useContext(Context);
  const authUser = authenticatedUser[0];

  //* State variables
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [materials, setMaterials] = useState("");
  const [errors, setErrors] = useState([]);
  const { emailAddress } = authUser;
  const { firstName } = authUser;
  const { lastName } = authUser;

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
        setDesc(value);
        break;
      case "estimatedTime":
        setTime(value);
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
      desc,
      time,
      materials,
    };

    data
      .createCourse(course, emailAddress)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        }
      })
      .catch((err) => console.log(err));
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
                value={desc}
                onChange={handleValueChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                value={time}
                onChange={handleValueChange}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                value={materials}
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
