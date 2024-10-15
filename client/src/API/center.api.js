import axios from 'axios';
import Cookies from "js-cookie";
const URI = import.meta.env.VITE_URI

export const createCenter = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/center/createCenter`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const getCenterById = async (id) => {
  try {
    const res = await axios.get(`${URI}/api/center/getCenterById/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const updateCenter = async (data) => {
  try {
    const res = await axios.patch(`${URI}/api/center/updateCenter/${data.id}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const deleteCenter = async (id) => {
  try {
    const res = await axios.delete(`${URI}/api/center/deleteCenter/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const getAllCenters = async () => {
  try {
    const res = await axios.get(`${URI}/api/center/getAllCenters`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};
