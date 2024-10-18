import React, { useState, useEffect } from "react";
import { FaSave } from "react-icons/fa";
import { Switch } from "@mui/material";
import swal from "sweetalert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { getAttendance } from "../../API/attendance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

function Attendance() {
  const round = Cookies.get("round");
  const [firstRoundStudents, setFirstRoundStudents] = useState([]);
  const [secondRoundStudents, setSecondRoundStudents] = useState([]);
  const [seats, setSeats] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
  });

  const token = Cookies.get("token");
  const user = jwtDecode(token);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance(user);
      const seatArray = res?.data?.data[0]?.seats.map((seat) => ({
        busBook: seat._id,
        status: false,
      }));
      setSeats(res?.data?.data[0]?.seats);

      // Initialize attendance rounds
      if (!round) {
        Cookies.set("round", "first");
      }

      setFirstRoundStudents(seatArray);
      setSecondRoundStudents(seatArray);

      // Store attendance data in localStorage for first and second rounds
      if (!localStorage.getItem("first")) {
        localStorage.setItem("first", JSON.stringify(seatArray));
      }
      if (!localStorage.getItem("second")) {
        localStorage.setItem("second", JSON.stringify(seatArray));
      }
    } catch (error) {
      swal("Error", "Failed to fetch attendance records", "error");
    }
  };

  const handleStatusChange = (userId) => {
    if (round === "first") {
      const updatedStudents = firstRoundStudents.map((student) =>
        student.busBook === userId
          ? { ...student, status: !student.status }
          : student
      );
      setFirstRoundStudents(updatedStudents);
      localStorage.setItem("first", JSON.stringify(updatedStudents));
    } else {
      const updatedStudents = secondRoundStudents.map((student) =>
        student.busBook === userId
          ? { ...student, status: !student.status }
          : student
      );
      setSecondRoundStudents(updatedStudents);
      localStorage.setItem("second", JSON.stringify(updatedStudents));
    }
  };

  useEffect(() => {
    const storedStudents =
      round === "first"
        ? JSON.parse(localStorage.getItem("first"))
        : JSON.parse(localStorage.getItem("second"));

    if (storedStudents) {
      round === "first"
        ? setFirstRoundStudents(storedStudents)
        : setSecondRoundStudents(storedStudents);
    }
  }, [round]);

  return (
    <div className="min-h-screen mt-16 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-4 md:p-6">
        <div className="flex justify-evenly mb-6">
          <button
            onClick={() => Cookies.set("round", "first")}
            className={`text-white px-8 py-2 rounded-lg ${
              round === "first" ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            First Round
          </button>
          <button
            onClick={() => Cookies.set("round", "second")}
            className={`text-white px-8 py-2 rounded-lg ${
              round === "second" ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            Second Round
          </button>
        </div>

        <div className="mb-6 text-center">
          <span className="text-green-500 font-bold">
            Present: {attendanceStats.present}
          </span>{" "}
          |{" "}
          <span className="text-red-500 font-bold">
            Absent: {attendanceStats.absent}
          </span>
        </div>

        {/* Attendance Table */}
        <form>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 mb-6 text-sm md:text-base">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">S.no</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Contact_no</th>
                  <th className="py-2 px-4 border-b">Pick up</th>
                  <th className="py-2 px-4 border-b">Center</th>
                  <th className="py-2 px-4 border-b">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {seats.length > 0 ? (
                  seats.map((seat, i) => (
                    <tr key={seat._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center border-b">
                        {i + 1}
                      </td>
                      <td className="py-2 px-4 text-center border-b">
                        {seat?.busBook?.user?.name}
                      </td>
                      <td className="py-2 px-4 text-center border-b">
                        {seat?.busBook?.user?.contact_no}
                      </td>
                      <td className="py-2 px-4 text-center border-b">
                        {seat?.busBook?.pickup}
                      </td>
                      <td className="py-2 px-4 text-center border-b">
                        {seat?.busBook?.center?.center}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center justify-end space-x-2">
                          <Switch
                            checked={
                              round === "first"
                                ? firstRoundStudents.find(
                                    (student) => student.busBook === seat._id
                                  )?.status
                                : secondRoundStudents.find(
                                    (student) => student.busBook === seat._id
                                  )?.status
                            }
                            onChange={() => handleStatusChange(seat._id)}
                            color="success"
                            icon={<CancelIcon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center"
            >
              <FaSave className="mr-2" /> Save Attendance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Attendance;
