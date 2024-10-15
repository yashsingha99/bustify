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
  const [users, setUsers] = useState([]);
  const [firstRoundStudents, setFirstRoundStudents] = useState();
  const [secondRoundStudents, setSecondRoundStudents] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
  });
  const token = Cookies.get("token");
  let user = jwtDecode(token);
  const round = localStorage.getItem("round");
  useEffect(() => {
    const hasFetched = Cookies.get("hasFetched")

    if (user && hasFetched != false) {
      fetchAttendance();
      Cookies.set("hasFetched", false)
    }
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getAttendance(user);
      if (res) {
        const updatedStudents = {};
        const uniqueUsers = new Set(); 
  
        res.data[0].centers.forEach((center) => {
          center.user.forEach((user) => {
            updatedStudents[user._id] = false; 
            uniqueUsers.add(user._id); 
          });
        });
  
        const usersArray = Array.from(uniqueUsers).map((userId) => {
          const user = res.data[0].centers.flatMap(center => center.user).find(u => u._id === userId);
          return user; 
        });
  
        setUsers(usersArray);
        setFirstRoundStudents(updatedStudents);
        setSecondRoundStudents(updatedStudents);
        localStorage.setItem("firstRoundStudents", JSON.stringify(updatedStudents))
        localStorage.setItem("secondRoundStudents", JSON.stringify(updatedStudents))
      } else {
        swal("Error", "No attendance records found", "error");
      }
    } catch (error) {
      swal("Error", "Failed to fetch attendance records", "error");
    }
  };
  
  const handleStatusChange = (userId) => {
    if (round === "first") {
      setFirstRoundStudents((prevStudents) => {
        const updatedStudents = { ...prevStudents };
        updatedStudents[userId]= !updatedStudents[userId]; 
        localStorage.setItem(
          "firstRoundStudents",
          JSON.stringify(updatedStudents)
        );
        return updatedStudents;
      });
    } else {
      setSecondRoundStudents((prevStudents) => {
        const updatedStudents = { ...prevStudents };
        updatedStudents[userId] = !updatedStudents[userId]
        localStorage.setItem(
          "secondRoundStudents",
          JSON.stringify(updatedStudents)
        );
        return updatedStudents;
      });
    }
  };

  useEffect(() => {
    const storedStudents =
      round === "first"
        ? JSON.parse(localStorage.getItem("firstRoundStudents"))
        : JSON.parse(localStorage.getItem("secondRoundStudents"));

    if (storedStudents) {
      if (round === "first") {
        setFirstRoundStudents(storedStudents);
      } else {
        setSecondRoundStudents(storedStudents);
      }
    }
  }, [round]);

  return (
    <div className="min-h-screen mt-16 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-4 md:p-6">
        <div className="flex justify-evenly mb-6">
          <button
            onClick={() => localStorage.setItem("round", "first")}
            className={`text-white px-8 py-2 rounded-lg ${
              round === "first" ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            First Round
          </button>
          <button
            onClick={() => localStorage.setItem("round", "second")}
            className={`text-white px-8 py-2 rounded-lg bg-blue-500 `}
          >
            Second Round
          </button>
        </div>

        {/* Attendance Stats */}
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
                  <th className="py-2 px-4 border-b">Student Name</th>
                  <th className="py-2 px-4 border-b">Attendance Status</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 text-center border-b">
                        {user.name}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex items-center justify-end space-x-2">
                          <Switch
                            checked={
                              round === "first"
                                ? firstRoundStudents[user._id]|| false
                                : secondRoundStudents[user._id]|| false
                            }
                            onChange={() => handleStatusChange(user._id)}
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
                    <td colSpan={2} className="py-4 text-center">
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
