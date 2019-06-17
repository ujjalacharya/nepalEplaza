import axios from "axios";
import { API } from "../config";
import queryString from "query-string";

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

export const list = params => {
  const query = queryString.stringify(params);
  return axios.get(`${API}/products/search?${query}`);
};

export const getProductBySlug = slug => axios.get(`${API}/products/${slug}`);