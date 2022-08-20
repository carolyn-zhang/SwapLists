import http from "../http-common";

class UserService {

  getUser(id) {
    return http.get(`/users/${id}`);
  }

  checkUser(email) {
      return http.get(`/users/?email=${email}`);
  }

  createUser(data) {
    return http.post("/users", data);
  }
}

export default new UserService();
