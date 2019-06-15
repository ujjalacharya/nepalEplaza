import axios from "axios";
import { API } from "../config";

export const getProducts = sortBy => {
  return axios.get(`${API}/products?sortBy=${sortBy}&order=desc`);
};

export const getAllCategories = () => axios.get(`${API}/categories`);

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return axios.post(`${API}/products/filter`, data);
};
