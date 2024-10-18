import axios from "axios";
import Cookies from "js-cookie";
const URL = import.meta.env.VITE_URI;

const URI = `${URL}/api/attendance`;

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  console.log(token);

  return {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  };
};

export const createOrUpdateAttendance = async (data) => {
  try {
    const res = await axios.post(`${URI}/`, data );
    return res;
  } catch (error) {
    console.error(error);
    return { ...error, status: 400 };
  }
};

export const updateAttendance = async (id, data) => {
  try {
    const res = await axios.put(`${URI}/${id}`, data, getAuthHeaders());
    return res;
  } catch (error) {
    console.error(error);
    return { ...error, status: 400 };
  }
};

export const getAttendance = async (user) => {
  try {

    const res = await axios.post(`${URI}/getAttendance`,  user );
    // console.log(res);
    
    return res;
  } catch (error) {
    console.error(error);
    return { ...error, status: 400 };
  }
};

export const deleteAttendance = async (id) => {
  try {
    const res = await axios.delete(`${URI}/${id}`, getAuthHeaders());
    return res;
  } catch (error) {
    console.error(error);
    return { ...error, status: 400 };
  }
};
