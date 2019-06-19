import axios from "axios";
import queryString from "query-string";

export const getProducts = sortBy => {
  return axios.get(`/products?sortBy=${sortBy}&order=desc`);
};

export const getAllCategories = () => axios.get('/categories');

export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters
  };
  return axios.post('/products/filter', data);
};

export const list = params => {
  const query = queryString.stringify(params);
  return axios.get(`/products/search?${query}`);
};

export const getProductBySlug = slug => axios.get(`/products/${slug}`);

export const getRelatedProducts = slug => axios.get(`/products/related/${slug}`)