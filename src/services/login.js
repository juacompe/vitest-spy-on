import axios from "axios";

export default class {
  login(username, password) {
    return axios.post(`/login/`, { username: username, password: password });
  }
}
