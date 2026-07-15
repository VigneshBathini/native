//app.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://api.company.com",
  timeout: 10000,
})

api.interceptors.request.use((config) => {

  config.headers.Authorization = "Bearer YOUR_TOKEN";

  return config;

});


api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);

    return Promise.reject(error);
  }
);  

export default api;
