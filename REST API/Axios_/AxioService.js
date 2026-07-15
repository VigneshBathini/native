// import api from "./App"

// const response =  await api.get("/users")

import api from "./api";

export const getUsers = () => {
  return api.get("/users");
};
