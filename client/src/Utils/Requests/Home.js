import axios from "axios";
import { API } from "../config";

export const getProducts = sortBy => {
 return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`);
}