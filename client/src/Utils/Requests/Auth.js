import axios from "axios";
import jwt from "jsonwebtoken";

import { API, JWT_SECRET } from "../config";

export const signUp = user => axios.post(`${API}/signup`, user);

export const signIn = user => axios.post(`${API}/signin`, user);

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data.data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  let jsontoken = localStorage.getItem("jwt");

  let data;

  if (jsontoken) {
    let { token } = JSON.parse(jsontoken);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        data = false;
      } else {
        data = JSON.parse(jsontoken);
      }
    });
    return data;
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");

    return axios.get(`${API}/signout`);
  }
};
