/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOutline } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import signupImage from "../../../assets/icon/Sign Up.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const Login = () => {
  const [passView, setPassView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signuprg, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    setIsLoading(true);

    signuprg(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Email or password incorrect",
          timer: 3000,
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogle = () => {
    googleSignin()
      .then((result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          method: "google",
          role: "user",
        };

        return axios.post("https://freshcutserverside.vercel.app/users", googleUser);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google sign-in successful",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google login failed",
          text: error.message,
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row gap-10 items-center bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
        <div className="lg:w-1/2">
          <img
            className="w-full h-full object-cover max-h-[600px]"
            src={signupImage}
            alt="Login"
          />
        </div>

        <div className="lg:w-1/2 w-full p-8">
          <h1 className="font-semibold text-2xl lg:text-3xl mb-4">
            Log in to Fresh Cut Chicken Service
          </h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border-b-2 border-gray-400 py-2 outline-none"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={passView ? "text" : "password"}
                {...register("password", { required: true })}
                className="w-full border-b-2 border-gray-400 py-2 pr-10 outline-none"
                placeholder="Password"
              />
              <span
                onClick={() => setPassView(!passView)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              >
                {passView ? <IoEyeOutline /> : <RiEyeCloseLine />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary bg-primary text-white w-full py-2 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Logging In...
                </div>
              ) : (
                "Log In"
              )}
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogle}
              className="btn btn-outline border border-gray-400 text-gray-700 w-full py-2 rounded-md flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signUp"
              className="text-primary font-medium border-b border-primary hover:opacity-80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
