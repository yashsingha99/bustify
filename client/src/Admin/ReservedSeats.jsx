import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Back icon for mobile
import { createOrUpdateAttendance } from "../API/attendance";
import { getAllCenters } from "../API/center.api";

const ReservedSeats = () => {
  const [centers, setCenters] = useState([]);
  const [email, setEmail] = useState("");
  const [centerId, setCenterId] = useState(null); // For selected center
  const [seats, setSeats] = useState([]); // For busBook (seats) data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [order, setOrder] = useState();
  const [center1, setCenter1] = useState([]);
  const [center2, setCenter2] = useState([]);
  const [seats1, setSeats1] = useState([]);
  const [seats2, setSeats2] = useState([]);


  useEffect(() => {
    const fetchAllCenters = async () => {
      try {
        const response = await getAllCenters();
        //  console.log(response);
         
        if (response?.data?.length > 0) {

          let tempCenter1 = {};
          let tempCenter2 = {};
          let tempSeats1 = {};
          let tempSeats2 = {};

          response.data.map((center) => {
            center?.busBook?.map((seats) => {
             
              if (seats.date === "26-10-2024") {
                if (!tempSeats1[center._id]) {
                  tempSeats1[center._id] = [];
                }
                tempSeats1[center._id].push(seats);
                
                if (!tempCenter1[center._id]) {
                  tempCenter1[center._id] = [];
                  tempCenter1[center._id].push(center);
                }
              } else {
                if (!tempSeats2[center._id]) {
                  tempSeats2[center._id] = [];
                }
                tempSeats2[center._id].push(seats);
                if (!tempCenter2[center._id]) {
                  tempCenter2[center._id] = [];
                  tempCenter2[center._id].push(center);
                }
              }


            });
            // tempCenter1[center._id].push(center);
          });
          setCenter1(tempCenter1);
          setCenter2(tempCenter2);
          setSeats1(tempSeats1); // Update the state
          setSeats2(tempSeats2); // Update the state

        } else {
          setError("No center available.");
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        
        setError("Failed to fetch data.");
        setLoading(false);
        Swal.fire("Error", "Could not load data.", "error");
      }
    };

    fetchAllCenters();
  }, []); 

// console.log(center1);
// console.log(center2);
console.log(seats1);
// console.log(seats2);


  const handleCoordinate = async () => {
    try {
      let candidates = [];
      if (order === "first") {
        const seats = seats1[centerId];
        // seats.forEach((seat) => {
        //   candidates.push(seat?.user)
        // })
      } else {
        const seats = seats2[centerId];
        // seats.forEach((seat) => {
        //   candidates.push(seat?.user?._id)
        // })
      }
      
      const data = { coordinate: email, centerId, seats };
      const res = await createOrUpdateAttendance(data);
      alert("Success");
      setEmail("");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-24 text-xl">Loading...</div>;
  }

  // if (error) {
  //   return (
  //     <div className="text-center mt-24 text-xl text-red-500">{error}</div>
  //   );
  // }

  return (
    <div className="flex flex-col mt-24 md:flex-row p-4 w-full h-full mx-auto">
      <div
        className={`md:w-1/3 w-full border-r md:border-r-2 md:pr-4 mb-4 md:mb-0 ${
          centerId ? "hidden md:block" : "block"
        }`}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Centers</h1>

        <input
          type="text"
          placeholder="Filter by center"
          className="p-2 w-full mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="text-xl">26-10-2024</div>
        {Object.keys(center1).length > 0 ? (
          Object.values(center1).map((centers) => {
            const center = centers[0];
            return (
              <div
                key={center._id}
                className={`cursor-pointer p-3 mb-2 rounded-lg shadow-md ${
                  order == "first" && centerId == center._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => {
                  setSeats(center.busBook);
                  setCenterId(center._id);
                  setOrder("first");
                }}
              >
                {center?.center} (Seats: {seats1[center._id]?.length})
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No results found.
          </div>
        )}

        <div className="mt-8 text-xl">27-10-2024</div>
        {Object.keys(center2).length > 0 ? (
          Object.values(center2).map((centers) => {
            const center = centers[0];
            return (
              <div
                key={center._id}
                className={`cursor-pointer p-3 mb-2 rounded-lg shadow-md ${
                  order == "second" && centerId == center._id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
                onClick={() => {
                  setSeats(center.busBook);
                  setCenterId(center._id);
                  setOrder("second");
                }}
              >
                {center?.center} (Seats: {seats2[center._id]?.length})
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No results found.
          </div>
        )}
      </div>

      {centerId && order === "first" && (
        <div
          className={`md:w-2/3 w-full pl-4 rounded-xl shadow-md p-8 bg-gray-200 ${
            order == "first" ? "block" : "hidden md:block"
          }`}
        >
          {Object.keys(seats1).length ? (
            <div>
              <button
                className="md:hidden mb-4 flex items-center text-blue-500"
                onClick={() => setCenterId(null)}
              >
                <ArrowBackIcon className="mr-2" /> Back to Centers
              </button>

              {seats1[centerId].map((seat) => (
                <div
                  key={seat._id}
                  className={`p-3 mb-2 ${
                    seat?.user?.role === "coordinate" ||
                    seat?.user?.role === "admin"
                      ? "bg-cyan-600 text-white"
                      : "bg-white"
                  } border rounded-lg flex justify-between items-center`}
                >
                  <div>
                    <p>
                      <strong>User:</strong> {seat?.user?.name} (
                      {seat?.user?.email})
                    </p>
                    <p>
                      <strong>Mobile Number:</strong> {seat?.user?.contact_no}
                    </p>
                    <p>
                      <strong>Pick up point:</strong> {seat?.pickup}
                    </p>
                    <p>
                      <strong>Exam date:</strong> {seat?.date}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex w-full text-xl bg-white px-2 items-center rounded-lg">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-lg border-none outline-none"
                />
                <div onClick={handleCoordinate} className="pointer">
                  <SendIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <h2 className="text-xl font-bold">Welcome</h2>
              <p>Select a center to view its reserved seats.</p>
            </div>
          )}
        </div>
      )}

      {centerId && order === "second" && (
        <div
          className={`md:w-2/3 w-full pl-4 rounded-xl shadow-md p-8 bg-gray-200 ${
            order == "second" ? "block" : "hidden md:block"
          }`}
        >
          {Object.keys(seats2).length ? (
            <div>
              <button
                className="md:hidden mb-4 flex items-center text-blue-500"
                onClick={() => setCenterId(null)}
              >
                <ArrowBackIcon className="mr-2" /> Back to Centers
              </button>

              {seats2[centerId].map((seat) => (
                <div
                  key={seat._id}
                  className={`p-3 mb-2 ${
                    seat?.user?.role === "coordinate" ||
                    seat?.user?.role === "admin"
                      ? "bg-cyan-600 text-white"
                      : "bg-white"
                  } border rounded-lg flex justify-between items-center`}
                >
                  <div>
                    <p>
                      <strong>User:</strong> {seat?.user?.name} (
                      {seat?.user?.email})
                    </p>
                    <p>
                      <strong>Mobile Number:</strong> {seat?.user?.contact_no}
                    </p>
                    <p>
                      <strong>Pick up point:</strong> {seat?.pickup}
                    </p>
                    <p>
                      <strong>Exam date:</strong> {seat?.date}
                    </p>
                  </div>
                </div>
              ))}

              <div className="flex w-full text-xl bg-white px-2 items-center rounded-lg">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-lg border-none outline-none"
                />
                <div onClick={handleCoordinate} className="pointer">
                  <SendIcon />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              <h2 className="text-xl font-bold">Welcome</h2>
              <p>Select a center to view its reserved seats.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReservedSeats;
