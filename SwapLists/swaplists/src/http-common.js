import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api", //172.20.10.2:8080
  headers: {
    "Content-type": "application/json"
  }
});
