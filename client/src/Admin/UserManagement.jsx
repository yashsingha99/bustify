import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import {
  getAllUsers,
  create,
  updateUserById,
  deleteUserById,
} from "../API/user.api";
import { getAllCenters } from "../API/center.api";
import { createBusBookByAdmin } from "../API/bus.api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();
  const navigate = useNavigate();
  const [allCenters, setAllCenters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUsers();
      await fetchCenters();
    };
    fetchData();
  }, []);

  const fetchCenters = async () => {
    try {
      const res = await getAllCenters();
      setAllCenters(res.data || []);
    } catch (err) {
      console.error("Failed to load centers:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to load centers. Please try again later.",
        icon: "error",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch users.",
        icon: "error",
      });
    }
  };

  const handleFilter = (data) => {
    const searchLowerCase = data.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user._id.toLowerCase().includes(searchLowerCase) ||
        user.name.toLowerCase().includes(searchLowerCase) ||
        user.email.toLowerCase().includes(searchLowerCase) ||
        user.contact_no.toLowerCase().includes(searchLowerCase)
    );
    setFilteredUsers(filtered);
  };

  const handleRowClick = (id) => {
    navigate(`/user/${id}`);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditingUser(user);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("contact_no", user.phoneNumber);
  };

  const onSubmit = async (data) => {
    try {
      if (editMode) {
        await updateUserById(editingUser._id, data);
        Swal.fire({
          title: "Success",
          text: "User updated successfully.",
          icon: "success",
        });
      } else {
        await createBusBookByAdmin(data);
        Swal.fire({
          title: "Success",
          text: "User created successfully.",
          icon: "success",
        });
      }
      await fetchUsers(); // Refresh the user list
      setEditMode(false);
      setEditingUser(null);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit the form.",
        icon: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteUserById(id);
        Swal.fire("Deleted!", "The user has been deleted.", "success");
        await fetchUsers(); // Refresh the user list
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the user.",
        icon: "error",
      });
    }
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => handleFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        />
        <button
          onClick={() => {
            setEditMode(false);
            setEditingUser(null);
            reset();
          }}
          className="bg-green-500 text-white p-2 rounded md:w-1/6"
        >
          Add New User
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mb-6 bg-gray-100 p-4 rounded shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editMode ? "Edit User" : "Create User"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            {...register("contact_no", {
              required: "Phone Number is required",
            })}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Pick Up</label>
          <select
            {...register("pickup")}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option value="GLA MAIN GATE">GLA MAIN GATE</option>
            <option value="Chhatikra">Chhatikra</option>
            <option value="Goverdhan chauraha">Goverdhan chauraha</option>
            <option value="Krishana Valley">Krishana Valley</option>
            <option value="TownShip">TownShip</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">paymentId</label>
          <input
            type="text"
            {...register("paymentId", { required: "paymentId is required" })}
            className="p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Select Center</label>
          <select
            {...register("center")}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            {allCenters && allCenters.length > 0 ? (
              allCenters.map((center) => (
                <option key={center?._id} value={center?._id}>
                  {center.center}
                </option>
              ))
            ) : (
              <option value="">No centers available</option>
            )}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">date</label>
          <select
            {...register("date")}
            className="p-2 border border-gray-300 rounded w-full"
            required
          >
            <option key={"26-10-2024"} value={"26-10-2024"}>
              26-10-2024
            </option>
            <option key={"27-10-2024"} value={"27-10-2024"}>
              27-10-2024
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          {editMode ? "Update User" : "Create User"}
        </button>
      </form>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">ID</th>
            <th className="border-b px-4 py-2">Name</th>
            <th className="border-b px-4 py-2">Email</th>
            <th className="border-b px-4 py-2">Phone Number</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="cursor-pointer hover:bg-gray-100">
              <td className="border-b px-4 py-2">{user._id}</td>
              <td className="border-b px-4 py-2">{user.name}</td>
              <td className="border-b px-4 py-2">{user.email}</td>
              <td className="border-b px-4 py-2">{user.contact_no}</td>
              <td className="border-b px-4 py-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="bg-yellow-500 text-white p-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
