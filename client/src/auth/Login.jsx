import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../API/user.api";
import CircularProgress from "@mui/material/CircularProgress";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [progress, setProgress] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setProgress(true);
    try {
      const res = await login(data);
      if (res.status == 200) {
        setProgress(false);
        swal({
          title: "Welcome!",
          text: "Your account has been created successfully!",
          icon: "success",
          timer: 1500,
          buttons: false,
          timerProgressBar: true,
        });
        navigate("/");
      } else {
        swal(
          "Invalid",
          "Invalid email or password. Please check your credentials and try again.",
          "error"
        );
      }
    } catch (error) {
      swal({
        title: "Login Failed!",
        text: "Invalid email or password. Please check your credentials and try again.",
        icon: "error",
        buttons: false,
        timerProgressBar: true,
      });
    }
    reset();
    setProgress(false);
  };

  return (
    <div
      className="lg:h-screen w-full flex flex-wrap justify-center lg:flex lg:justify-center lg:items-center"
      sx={{}}
      maxWidth="xs"
    >
      <div
        className=" mt-12 bg-cyan-800 lg:rounded-s-xl h-2/3 py-16 p-4 w-full  lg:w-1/4 text-white"
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
        sx={{}}
      >
        <div className="flex flex-col justify-center items-center">
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <h4 className="black flex ">
            Don't have an account?{" "}
            <Link to="/signup">
              <div className="text-blue-800 ml-2 mb-2"> Register</div>
            </Link>
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              {...register("password", { required: "Password is required" })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
              Login
              {progress && (
                <div className="ml-4 flex items-center">
                  <CircularProgress size={20} color="inherit" />{" "}
                </div>
              )}
            </Button>
          </Box>
        </form>
        <br />
      </div>
    </div>
  );
};

export default Login;
