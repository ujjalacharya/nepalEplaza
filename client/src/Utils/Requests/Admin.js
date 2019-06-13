import axios from "axios";
import { API } from "../config";

export const createCategory = category => axios.post(`${API}/categories`, category);
