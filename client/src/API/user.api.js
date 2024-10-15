import axios from "axios";
import Cookies from "js-cookie";
const URI = import.meta.env.VITE_URI


export const create = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/user/create`, data);
    const token = res.data.token;
    Cookies.set("token", token);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const login = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/user/login`, data)
    const token = res.data.token;
    Cookies.set("token", token);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};


export const getUserById = async (id) => {
  try {
    const res = await axios.get(`${URI}/api/user/getUserById/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
}


export const getUser = async () => {
  try {
    const res = await axios.get(`${URI}/api/user/getUser`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
}


export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${URI}/api/user/getAllUsers`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
}


export const updateUserById = async (data) => {
  try {
    const res = await axios.patch(`${URI}/api/user/updateUserById/${data._id}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
}


export const deleteUserById = async (id) => {
  try {
    const res = await axios.delete(`${URI}/api/user/deleteUserById/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
}