import axios from "axios";

export const createCategory = category =>
  axios.post('/categories', category);

export const createProduct = product => axios.post('/products', product);
