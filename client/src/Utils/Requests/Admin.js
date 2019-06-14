import axios from "axios";
import { API } from "../config";

export const createCategory = category =>
  axios.post(`${API}/categories`, category);

export const createProduct = product => {
 return axios.post(`${API}/products`, product);
}
