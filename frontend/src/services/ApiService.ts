import axios from "axios";

const ApiService = axios.create({
  baseURL: "http://localhost:3001/",
});

ApiService.defaults.headers = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default ApiService;
