//* React and React Router imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//* Component Imports
import Header from "./Components/Header";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UserSignOut from "./Components/UserSignOut";
import NotFound from "./Components/NotFound";
import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Courses />
        </Route>

        <PrivateRoute path="/courses/create">
          <CreateCourse />
        </PrivateRoute>

        <PrivateRoute path="/courses/:id/update">
          <UpdateCourse />
        </PrivateRoute>

        <Route path="/courses/:id">
          <CourseDetail />
        </Route>

        <Route path="/signin">
          <UserSignIn />
        </Route>

        <Route path="/signup">
          <UserSignUp />
        </Route>

        <Route path="/signout">
          <UserSignOut />
        </Route>

        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
