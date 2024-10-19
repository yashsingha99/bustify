import axios from "axios";
import Cookies from "js-cookie";
const URI = import.meta.env.VITE_URI


export const createBooking = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/busBook/create`, data);

    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const getBookingById = async (id) => {
  try {
    const res = await axios.get(`${URI}/api/busBook/get/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};
export const changeRefund = async (paymentId) => {
  try {
    const res = await axios.post(`${URI}/api/busBook/changeRefund`, paymentId);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};
export const createBusBookByAdmin = async (data) => {
  try {
    const res = await axios.post(`${URI}/api/busBook/createBusBookByAdmin`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const updateBooking = async (id, data) => {
  try {
    const res = await axios.patch(`${URI}/api/busBook/update/${id}`, data);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const deleteBooking = async (id) => {
  try {
    const res = await axios.delete(`${URI}/api/busBook/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const getAllBookings = async () => {
  try {
    const res = await axios.get(`${URI}/api/busBook/getAllBookings`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};

export const getUserBooking = async (data) => {
  try {
    const res = await axios.get(`${URI}/api/busBook/getUserBooking`, {
      params: data, 
    });
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};
export const getAllBusBookData = async (data) => {
  try {
    const res = await axios.get(`${URI}/api/busBook/getAllBusBookData`);
    return res;
  } catch (error) {
    console.log(error);
    return { ...error, status: 400 };
  }
};
