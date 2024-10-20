import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import {
  createCenter,
  deleteCenter,
  getAllCenters,
  updateCenter,
} from "../API/center.api";

const CenterManagement = () => {
  const [centers, setCenters] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchCenters();
  }, [editMode, editingCenter]);

  useEffect(() => {
    if (editMode && editingCenter) {
      setValue("amount", editingCenter.amount);
      setValue("center", editingCenter.center);
      setValue("route", editingCenter.route.join(", "));
      setValue(
        "reachedAtBus",
        new Date(editingCenter.reachedAtBus).toISOString().substring(0, 16)
      );
      setValue("timing", editingCenter.timing);
    }
  }, [editMode, editingCenter, setValue]);

  const fetchCenters = async () => {
    try {
      const response = await getAllCenters();
      setCenters(response.data);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to fetch centers.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error fetching centers:", error);
    }
  };

  const handleCreateCenter = async (data) => {
    try {
      const response = await createCenter(data);
      
      if (centers) setCenters([...centers, response.data]);
      else setCenters(response.data);
      reset();
      Swal.fire({
        title: "Success",
        text: "Center created successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.response
          ? error.response.data.message
          : "Failed to create center.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error creating center:", error);
    }
  };

  const handleUpdateCenter = async (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this center.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await updateCenter({
            ...data,
            id: editingCenter._id,
          });
          setCenters(
            centers.map((center) =>
              center._id === editingCenter._id ? response.data : center
            )
          );
          reset();
          setEditMode(false);
          setEditingCenter(null);
          Swal.fire({
            title: "Updated!",
            text: "The center has been updated.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.response
              ? error.response.data.message
              : "Failed to update center.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Error updating center:", error);
        }
      }
    });
  };

  const handleDeleteCenter = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this center.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCenter(id);
          setCenters(centers.filter((center) => center._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "The center has been deleted.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: error.response
              ? error.response.data.message
              : "Failed to delete center.",
            icon: "error",
            confirmButtonText: "OK",
          });
          console.error("Error deleting center:", error);
        }
      }
    });
  };

  const handleEdit = (center) => {
    setEditingCenter(center);
    setEditMode(true);
  };

  return (
    <div className="p-4 w-full max-w-screen-xl mx-auto h-full mt-16 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-center">Center Management</h1>
      <form
        onSubmit={handleSubmit(
          editMode ? handleUpdateCenter : handleCreateCenter
        )}
        className="w-full max-w-lg grid gap-4 grid-cols-1 md:grid-cols-2 mb-6"
      >
        <input
          type="text"
          placeholder="Amount"
          {...register("amount", { required: "Amount is required" })}
          className="p-3 border border-gray-300 rounded w-full"
        />
        {errors.amount && (
          <p className="text-red-500 col-span-2">{errors.amount.message}</p>
        )}

        <select
          {...register("status", { required: "status is required" })}
          className="p-3 border border-gray-300 rounded w-full"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="unactive">UnActive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 col-span-2">{errors.status.message}</p>
        )}

        <input
          type="text"
          placeholder="Center"
          {...register("center", { required: "Center is required" })}
          className="p-3 border border-gray-300 rounded w-full"
        />
        {errors.center && (
          <p className="text-red-500 col-span-2">{errors.center.message}</p>
        )}

        <input
          type="text"
          placeholder="Route (comma separated)"
          {...register("route", { required: "Route is required" })}
          className="p-3 border border-gray-300 rounded w-full"
        />
        {errors.route && (
          <p className="text-red-500 col-span-2">{errors.route.message}</p>
        )}

        <input
          type="datetime-local"
          {...register("reachedAtBus", {
            required: "Reached At Bus is required",
          })}
          className="p-3 border border-gray-300 rounded w-full"
        />
        {errors.reachedAtBus && (
          <p className="text-red-500 col-span-2">
            {errors.reachedAtBus.message}
          </p>
        )}

        <select
          {...register("timing", { required: "Timing is required" })}
          className="p-3 border border-gray-300 rounded w-full"
        >
          <option value="">Select Timing</option>
          <option value="Forenoon">Forenoon</option>
          <option value="Afternoon">Afternoon</option>
        </select>
        {errors.timing && (
          <p className="text-red-500 col-span-2">{errors.timing.message}</p>
        )}

        <button
          type="submit"
          className={`col-span-2 text-white p-3 rounded ${
            editMode ? "bg-yellow-500" : "bg-blue-500"
          }`}
        >
          {editMode ? "Update Center" : "Create Center"}
        </button>
      </form>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">ID</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Center</th>
              <th className="border-b px-4 py-2">Amount</th>
              <th className="border-b px-4 py-2">Route</th>
              <th className="border-b px-4 py-2">Reached At Bus</th>
              <th className="border-b px-4 py-2">Timing</th>
              <th className="border-b px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {centers &&
              centers.length > 0 &&
              centers.map((center) => (
                <tr key={center._id} className="border-b">
                  <td className="px-4 py-2">{center._id}</td>
                  <td className="px-4 py-2">{center.status}</td>
                  <td className="px-4 py-2">{center.center}</td>
                  <td className="px-4 py-2">{center.amount}</td>
                  <td className="px-4 py-2">{center.route.join(", ")}</td>
                  <td className="px-4 py-2">
                    {new Date(center.reachedAtBus).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{center.timing}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => handleEdit(center)}
                      className="bg-yellow-500 text-white p-2 rounded"
                    >
                      Edit
                    </button>
                     <button
                      onClick={() => handleDeleteCenter(center._id)}
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
    </div>
  );
};

export default CenterManagement;
