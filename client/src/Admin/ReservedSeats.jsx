import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back icon for mobile
import { createOrUpdateAttendance } from "../API/attendance";
import { getAllCenters } from "../API/center.api";

const ReservedSeats = () => {
  const [centers, setCenters] = useState([]);
  const [email, setEmail] = useState();
  const [centerId, setCenterId] = useState(null); // For outlet side
  const [users, setUsers] = useState([]); // For outlet side
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllCenters = async () => {
      try {
        const response = await getAllCenters();
        console.log(response);

        if (response?.data?.length > 0) {
          setCenters(response.data);
        } else {
          setError("No center available.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data.");
        setLoading(false);
        Swal.fire("Error", "Could not load data.", "error");
      }
    };
    fetchAllCenters();
  }, []);

  const handleCoordinate = async () => {
    try {
      const data = { coordinate: email, centerId };
      const res = await createOrUpdateAttendance(data);
      alert("success");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert("failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-24 text-xl ">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-24 text-xl text-red-500 ">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-24 md:flex-row p-4 w-full h-full mx-auto">
      <div
        className={`md:w-1/3 w-full border-r md:border-r-2 md:pr-4 mb-4 md:mb-0
         ${centerId ? "hidden md:block" : "block"}`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Centers</h1>

        <input
          type="text"
          placeholder="Filter by center"
          className="p-2 w-full mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {centers && centers.length > 0 ? (
          centers.map((center) =>  {
            if(center?.users?.length !== 0)
            return (
              <div
                key={center._id}
                className={`cursor-pointer p-3 mb-2 rounded-lg shadow-md ${
                  centerId === center._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => {
                  setUsers(center.user);
                  setCenterId(center._id);
                }}
              >
                {center.center} (Seats: {center.user.length})
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No results found.
          </div>
        )}
      </div>

      <div
        className={`md:w-2/3 w-full pl-4 rounded-xl shadow-md p-8 bg-gray-200 ${
          centerId ? "block" : "hidden md:block"
        }`}
      >
        {centerId && users.length > 0 ? (
          <div>
            <button
              className="md:hidden mb-4 flex items-center text-blue-500"
              onClick={() => {
                setUsers([]);
                setCenterId(null);
              }}
            >
              <ArrowBackIcon className="mr-2" /> Back to Centers
            </button>
            {users &&
              users.length > 0 &&
              users.map((user) => {
                return (
                  <div
                    key={user._id}
                    className="p-3 mb-2 bg-white border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>User:</strong> {user.name} ({user.email})
                      </p>
                      <p>
                        <strong>Mobile Number:</strong> {user?.contact_no}
                      </p>
                    </div>
                  </div>
                );
              })}
            <div className="flex w-full text-xl bg-white px-2 items-center rounded-lg">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-lg border-none outline-none"
              />
              <div onClick={() => handleCoordinate()} className="pointer">
                <SendIcon />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            <button
              className="md:hidden mb-4 flex justify-center text-blue-500"
              onClick={() => {
                setUsers([]);
                setCenterId(null);
              }}
            >
              <ArrowBackIcon className="mr-2" /> Back to Centers
            </button>
            <h2 className="text-xl font-bold">Welcome</h2>
            <p>Select a center to view its reserved seats.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservedSeats;
