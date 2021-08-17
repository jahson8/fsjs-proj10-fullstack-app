import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // Check if auth is required
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  //* GET all courses
  async getCourses() {
    const res = await this.api(`/courses`, "GET", null);

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else {
      throw new Error();
    }
  }

  //*   GET a Course
  async getCourse(id) {
    const res = await this.api(`/courses/${id}`, "GET", null);

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 404) {
      return null;
    } else {
      throw new Error();
    }
  }

  //*  create (POST) a course
  async createCourse(course, username, password) {
    const res = await this.api(`/courses`, "POST", course, true, {
      username,
      password,
    });

    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //*  update (PUT) a course
  async updateCourse(course, id, username, password) {
    const res = await this.api(`/courses/${id}`, "PUT", course, true, {
      username,
      password,
    });

    if (res.status === 204) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  //*  DELETE a course
  async deleteCourse(id, username, password) {
    const res = await this.api(`/courses/${id}`, "DELETE", null, true, {
      username,
      password,
    });

    if (res.status === 204) {
      return null;
    } else if (res.status === 403) {
      return null;
    } else {
      throw new Error();
    }
  }

  //* GET a user
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //* Create (POST) a user
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
