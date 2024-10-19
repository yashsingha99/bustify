import React, { useEffect, useState } from "react";
import { changeRefund, deleteBooking, getAllBusBookData } from "../API/bus.api";

function BusBook() {
  const [paymentId, setPaymentId] = useState("");
  const [busBookData, setBusBookData] = useState([]);

  const handleRefundChange = async () => {
    try {
      const res = await changeRefund({paymentId});
      console.log(res);
      alert("Refund status changed successfully");
    } catch (error) {
      console.log(error);
      alert("Error changing refund status");
    }
  };

  const handleDeleteBusBook = async (id) => {
    try {
      const res = await deleteBooking(id);
      console.log(res);
      alert("Booking deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting booking");
    }
  };

  useEffect(() => {
    const getAllBusBook = async () => {
      try {
        const res = await getAllBusBookData();
        console.log(res.data.data);
        setBusBookData(res.data.data);
      } catch (error) {
        console.log(error);
        alert("Error fetching bus book data");
      }
    };
    getAllBusBook();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bus Book Data</h1>

      {/* Table for displaying bus book data */}
      <div className="overflow-x-auto">
        {busBookData.length > 0 ? (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Payment ID</th>
                <th className="px-4 py-2">Bus</th>
                <th className="px-4 py-2">Seat</th>
                <th className="px-4 py-2">Center Amount</th>
                <th className="px-4 py-2">Center Name</th>
                <th className="px-4 py-2">Timing</th>
                <th className="px-4 py-2">User Name</th>
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Contact No</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {busBookData.map((busBook, index) => (
                <tr key={index} className="border-t">
                  <td className="border px-4 py-2">{busBook?.paymentId}</td>
                  <td className="border px-4 py-2">{busBook?.isRefund ? 'Refunded' : 'Not Refunded'}</td>
                  <td className="border px-4 py-2">{busBook?.date}</td>
                  <td className="border px-4 py-2">{busBook?.center?.amount}  </td>
                  <td className="border px-4 py-2">{busBook?.center?.center}</td>
                  <td className="border px-4 py-2">{busBook?.center?.timing} <br /> {busBook?.date}</td>
                  <td className="border px-4 py-2">{busBook?.user?.name}</td>
                  <td className="border px-4 py-2">{busBook?.user?.email}</td>
                  <td className="border px-4 py-2">{busBook?.user?.contact_no}</td>
                  <td className="border px-4 py-2 space-y-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      onClick={() => setPaymentId(busBook.paymentId)}
                    >
                      Select for Refund
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      onClick={() => handleDeleteBusBook(busBook?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bus book data available</p>
        )}
      </div>

      {/* Refund status change section */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold">Change Refund Status</h2>
        <div className="flex items-center mt-2 space-x-2">
          <input
            type="text"
            placeholder="Enter Payment ID"
            value={paymentId}
            onChange={(e) => setPaymentId(e.target.value)}
            className="border px-4 py-2 w-full md:w-1/3"
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
            onClick={handleRefundChange}
          >
            Change Refund Status
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusBook;
