import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  message: yup.string().required("Message is required"),
});

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Success!",
      text: "Message sent successfully!",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    reset();
  };

  return (
    <div className="max-w-6xl mt-16 mx-auto p-6">
      <h1 className="text-4xl font-bold text-center">Get in Touch</h1>
      <div className="container flex flex-wrap px-5 py-16 mx-auto">
        <div className="mb-4 flex flex-col">
          <div className="space-y-4">
            <div className="flex text-xl items-center">
              <Mail className="w-6 h-6 mr-3 text-blue-600" />
              <span>contact@bustify.in</span>
            </div>
            <div className="flex flex-wrap text-xl items-center">
              <Phone className="w-6 h-6 mr-3 text-blue-600" />
              <span>+91 7417582399, </span>
              <span className="ml-8">+91 7017484754</span>
            </div>
            <div className="flex text-xl items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-600" />
              <span>Near GLA University Mathura, 281406</span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-2xl p-12 rounded-xl lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="name" className="leading-7 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  {...register("name")}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label htmlFor="email" className="leading-7 text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  {...register("email")}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label htmlFor="message" className="leading-7 text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  {...register("message")}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
                {errors.message && <p className="text-red-500">{errors.message.message}</p>}
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={handleClick}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
