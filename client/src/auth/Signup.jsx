import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import { create } from "../API/user.api";
import Swal from "sweetalert2";
import { ScrollContext } from "../context/ScrollContext";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact_no: yup
    .string()
    .length(10, "Enter valid Contact No. ")
    .matches(/^\d+$/, "Contact number must contain only numbers")
    .required("Contact number is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(10, "Password must be at most 10 characters")
    .required("Password is required"),
});

const Signup = () => {
  const { isScroll, jumpToTop } = useContext(ScrollContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [progress, setProgress] = useState(false);

  const onSubmit = async (data) => {
    setProgress(true);

    try {
      const res = await create(data);
      if (res.status == 200) {
        Swal.fire({
          title: "Welcome!",
          text: "Your account has been created successfully!",
          icon: "success",
          timer: 3000,
          buttons: false,
          timerProgressBar: true,
        });
        jumpToTop();

        navigate("/");
      } else {
        swal("Oops!", "Try again", "error");
      }
    } catch (error) {
      Swal.fire({
        title: "Network Error",
        text: "Check Your Internet Connection",
        icon: "error",
        showConfirmButton: true,
      });
    }
    reset();
    jumpToTop();
    setProgress(false);
  };

  return (
    <div
      className="lg:h-screen w-full flex flex-wrap justify-center lg:flex lg:justify-center lg:items-center"
      sx={{}}
      maxWidth="xs"
    >
      <div
        className=" mt-12 w-full bg-cyan-800 lg:rounded-s-xl h-2/3 py-16 p-4  lg:w-1/4 text-white"
        sx={{ m: "40" }}
      >
        <h1 className="text-4xl font-bold text-center">Hello...</h1>
        <br />
        <div className="px-4">
          <hr />
        </div>

        <h2 className="mt-8 text-center italic text-4xl">
          Welcome to bustify.in!
        </h2>
        <div className="flex flex-col w-full px-4 items-center justify-center mt-4"></div>
      </div>
      <div
        className="lg:w-1/3 lg:mt-12 h-2/3  bg-white lg:rounded-e-xl p-8 shadow-2xl w-full"
        sx={{ w: 3 / 4 }}
      >
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <h4 className="black ml-4 flex text-center">
            Already have an account?
            <Link to="/Login">
              <p className="text-blue-900  ml-2 mb-2">Login</p>{" "}
            </Link>
          </h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              {...register("name")}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="Contact No."
              type="string"
              {...register("contact_no")}
              error={Boolean(errors.contact_no)}
              helperText={errors.contact_no?.message}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Sign Up
              {progress && (
                <div className="ml-4 flex items-center">
                  <CircularProgress size={20} color="inherit" />{" "}
                </div>
              )}
            </Button>
          </Box>
        </form>
        <br />
        <a href="https://forms.gle/xpgNcUQzBca2oJ4M8" className="text-blue-900 text-center w-full">
          <div> Apply for co-ordinate </div>
        </a>
      </div>
    </div>
  );
};

export default Signup;
