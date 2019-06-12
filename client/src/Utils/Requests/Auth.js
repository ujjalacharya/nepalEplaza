import appconstants from "../Constants.js";
import axios from "axios";

const { base_url } = appconstants;

export const signUp = user => {
  return axios({
    method: "post",
    url: `${base_url}/signup`,
    data: user
  });
};

export const signIn = user => {
  return axios({
    method: "post",
    url: `${base_url}/signin`,
    data: user
  });
};