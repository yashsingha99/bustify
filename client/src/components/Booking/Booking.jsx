import React, { useEffect, useState } from "react";
import { getAllCenters } from "../../API/center.api";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import swal from "sweetalert";
import "sweetalert2/dist/sweetalert2.min.css";
import "../../index.css";
import { createBooking } from "../../API/bus.api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import withReactContent from "sweetalert2-react-content";
import { useRazorpay } from "react-razorpay";

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const URI = import.meta.env.VITE_URI;

const MySwal = withReactContent(Swal);

const Booking = () => {
  const { Razorpay } = useRazorpay();

  const [allCenters, setAllCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const token = Cookies.get("token");
  const isAuthenticated = !!token;
  const userDetail = isAuthenticated ? jwtDecode(token) : null;
  const navigate = useNavigate();

  const handlePayment = async (center) => {
    try {
      // create order
      const response = await fetch(`${URI}/api/order/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: center.amount*100 }),
      });

      const order = await response.json();
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "bustify.in",
        description: "Payment for your Seat",
        order_id: order.id,
        handler: async (response) => {
          try {
            const { razorpay_payment_id } = response;
            //verify
            await fetch(`${URI}/api/order/verify_payment`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
         
            // Changed
            const bookingData = {
              center: center._id,
              paymentId: String(response.razorpay_payment_id),
              id: userDetail?.userId,
              date: Cookies.get("date"),
              pickup: Cookies.get("pickup"),
            };

            const createBook = await createBooking(bookingData);

            if (createBook.status === 201) {
              window.location.href = import.meta.env.VITE_WHATSAPP;
            } else {
              Swal.fire(
                "Error",
                "Failed to book the trip. Please try again.",
                "error"
              );
            }

            Cookies.remove("date");
            Cookies.remove("pickup");
          } catch (err) {
            console.log(err)
            swal("Payment failed", "Please Try Again", "error");
          }
        },
        prefill: {
          name: userDetail?.name || "User Name",
          email: userDetail?.email || "user@example.com",
          contact: userDetail?.contact_no || "9999999999",
        },
        notes: {
          address: "Bustify bus services",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzpay = new Razorpay(options);
      rzpay.open(options);
    } catch (err) {
      swal("Network Error", "Check Your Internet Connection", "error");
    }
  };

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const res = await getAllCenters();
        setAllCenters(res.data);
      } catch (err) {
        setError("Failed to load centers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCenters();
  }, []);

  const handleBook = async (center) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    Swal.fire({
      title: "Confirm Booking",
      html: `
       <div>
        <p>Are you sure you want to book this trip?</p>
        <p style="font-size: 0.875rem;">Center: ${center.center}</p>
        <p style="font-size: 0.875rem;">Amount: ₹${center.amount}</p>
        <select id="dateSelect" style="padding: 0.25rem; margin-bottom: 0.75rem; border: 1px solid #FF6600; border-radius: 0.375rem; width: 70%;">
          <option value="">Select Exam Date</option>
          <option value="26-10-2024">26-10-2024</option>
          <option value="27-10-2024">27-10-2024</option>
        </select>
        <select id="pickupSelect" style="padding: 0.25rem; margin-bottom: 0.75rem; border: 1px solid #FF6600; border-radius: 0.375rem; width: 70%;">
          <option value="">Select Pickup Point</option>
          <option value="GLA MAIN GATE">GLA MAIN GATE</option>
          <option value="Chhatikra">Chhatikra</option>
          <option value="Goverdhan chauraha">Goverdhan chauraha</option>
        </select>
        
      </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Book Now",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const dateSelect = document.getElementById("dateSelect");
        dateSelect.addEventListener("change", (e) => {
          const selectedDate = e.target.value;
          Cookies.set("date", selectedDate);
          setDate(selectedDate);
        });
        const pickupSelect = document.getElementById("pickupSelect");
        pickupSelect.addEventListener("change", (e) => {
          const pickup = e.target.value;
          Cookies.set("pickup", pickup);
        });
      },
      preConfirm: () => {
        const selectedDate = document.getElementById("dateSelect").value; // Get the selected date
        const pickupSelect = document.getElementById("pickupSelect").value; // Get the selected date
        // const checkbox = document.getElementById("qrWarning"); // Get the checkbox state

        if (!selectedDate) {
          Swal.showValidationMessage("Please select a date.");
        }
        if (!pickupSelect) {
          Swal.showValidationMessage("Please select a pickup point.");
        }
        // if (!checkbox.checked) {
        //   Swal.showValidationMessage(
        //     "You must confirm, not to pay by QR code."
        //   );
        // }

        return { selectedDate };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handlePayment(center);
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 mt-16">{error}</p>;
  }

  return (
    <section className={`py-16  ${!allCenters && "h-screen"}`}>
      <div className={`container ${!allCenters && "h-screen"} mx-auto`}>
        <h2 className="text-3xl mt-8 font-bold text-center">Book Your Trip</h2>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap xl:no-scrollbar -m-4">
              {allCenters && allCenters.length > 0 ? (
                allCenters.map((center) => (
                  <div key={center.id} className="p-4 xl:w-1/4 md:w-1/2 w-full">
                    <div
                      style={{ backgroundColor: "white" }}
                      className="h-full p-6 rounded-2xl border-2 border-orange-200 flex flex-col relative overflow-hidden"
                    >
                      <h2 className="text-lg tracking-widest title-font mb-1 font-medium">
                        {center.center}
                      </h2>
                      <div className="text-5xl  flex text-gray-900 pb-4 mb-4 border-b border-gray-200 leading-none">
                        <h1 className="text-2xl line-through text-gray-900 pb-4 ">
                          ₹{Number(center.amount) + Number(center.amount) * 0.4}
                        </h1>
                        <h1 className="text-4xl ml-2 text-orange-600 ">
                          ₹{center.amount}
                        </h1>
                      </div>

                      {/* <p className="text-md text-gray-700 mt-3">
                        Arrival:{" "}
                        {new Date(center.reachedAtBus).toLocaleTimeString()}
                      </p> */}
                      <p className="text-md mb-3 text-gray-700 mt-1">
                        Schedule: {center.timing}
                      </p>
                      <button
                        onClick={() => {
                          if (center.status === "active") handleBook(center);
                        }}
                        className={`flex items-center mt-auto ${
                          center.status === "unactive"
                            ? "bg-gray-500 "
                            : "bg-orange-500 hover:bg-orange-600"
                        } text-white border-0 py-2 px-4 w-full mt-4 focus:outline-none rounded`}
                      >
                        {center.status === "unactive"
                          ? "Not Available  "
                          : "Book Now"}

                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 ml-auto"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        Hurry up! Limited seats available.
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex items-center justify-center">
                  <div className="flex flex-col w-2/3 items-center justify-center bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h2 className="lg:text-xl text-lg font-semibold text-gray-700">
                      Centers will update soon
                    </h2>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Booking;

// <br/>
        // <input type="checkbox" id="qrWarning" style="transform: scale(1.5); margin-right: 0.5rem; cursor: pointer;" />
        // <label for="qrWarning">Please don't pay by QRCode in the next step</label>
