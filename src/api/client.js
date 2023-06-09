import axios from "axios";

const Client = axios.create({
  baseURL: "http://localhost:5000/api/",
});

export default Client;
