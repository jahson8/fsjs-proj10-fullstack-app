//* React and React Router imports
import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../Context";

const Courses = () => {
  // Get context variables
  const { data } = useContext(Context);

  // Set state variables
  const [courses, setCourses] = useState([]);

  const history = useHistory();

  // Get All Courses
  useEffect(() => {
    data
      .getCourses()
      .then((res) => setCourses(res))
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
        // history.push("/error");
      });
  }, [data, history]);

  const CoursesHTML = courses.map((course) => (
    <Link
      className="course--module course--link"
      to={`/courses/${course.id}`}
      key={course.id.toString()}
    >
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{course.title}</h3>
    </Link>
  ));

  return (
    <main>
      <div className="wrap main--grid">
        {CoursesHTML}

        <Link
          className="course--module course--add--module"
          to="create-course.html"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
