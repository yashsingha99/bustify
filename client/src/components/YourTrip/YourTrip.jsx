import React, { useEffect, useState } from "react";
import { getUserBooking } from "../../API/bus.api";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Fix incorrect import

function YourTrip() {
  const [trips, setTrips] = useState([]);
  const token = Cookies.get("token");
  const isAuthenticated = token !== undefined;
  let user_detail = isAuthenticated ? jwtDecode(token) : null;

  useEffect(() => {
    const fetchTrips = async () => {
      const data = { email: user_detail.email };
      const res = await getUserBooking(data);
      if (res.status === 200) {
        setTrips(res.data.bookSchema);
      } else {
        console.error("Error fetching trips:", res);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div className="min-h-screen p-4 mt-16 sm:mt-20">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
        Your Booked Trips
      </h1>
      <div className="max-w-4xl mx-auto space-y-4">
        {trips && trips.length ? (
          trips.map((trip) => (
            <div
              key={trip?._id}
              className="bg-white shadow-md rounded-lg p-4 sm:p-6 md:flex md:items-center md:justify-between"
            >
              <div className="md:w-2/3">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Center: {trip?.center ? trip?.center?.center : "N/A"}
                </h2>
                <p className="text-gray-600 mt-1 sm:mt-2">
                  Route:{" "}
                  {trip?.center ? trip?.center?.route.join(" → ") : "N/A"}
                </p>
                <p className="text-gray-600 mt-1 sm:mt-2">
                  Timing: {trip?.center ? trip?.center?.timing : "N/A"}
                </p>
                <p className="text-gray-600 mt-1 sm:mt-2">
                  Reached At:{" "}
                  {trip?.center
                    ? new Date(trip?.center?.reachedAtBus).toLocaleString()
                    : "N/A"}
                </p>
                <p
                  className={`mt-1 sm:mt-2 font-semibold ${
                    trip.center && trip.center.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {trip?.center ? trip?.center?.status : "N/A"}
                </p>
              </div>

              {/* Payment and Booking Info */}
              <div className="mt-4 md:mt-0 md:w-1/3 text-center sm:text-left">
                <p className="text-gray-800 font-semibold">
                  Amount: ₹{trip?.center ? trip?.center?.amount : "N/A"}
                </p>
                <p className="text-gray-600 mt-1">
                  Payment ID: {trip?.paymentId || "N/A"}
                </p>
                <p className="text-gray-500 mt-1 sm:mt-2 text-sm">
                  Booked on: {new Date(trip?.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">
              No Trips Found
            </h2>
            <p className="text-gray-600 mt-2">
              It looks like you haven't booked any trips yet.
            </p>
            <p className="text-gray-600 mt-2">
              Check back later or start booking your next adventure!
            </p>
            <a
              href="/booking"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Book Now
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default YourTrip;
