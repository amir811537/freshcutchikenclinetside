/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import signupImage from "../../../assets/icon/Sign Up.webp";
import { IoEyeOutline } from 'react-icons/io5';
import { RiEyeCloseLine } from 'react-icons/ri';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = () => {
  const [passView, setPassView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { createUser, googleSignin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { userName, email, password } = data;

    setIsLoading(true);

    try {
      await createUser(email, password);

      const userData = {
        name: userName,
        email,
        method: "email",
        role: "user",
      };

      await axios.post("https://freshcutserverside.vercel.app/users", userData);

      Swal.fire({
        icon: "success",
        title: "Registration successful",
        timer: 3000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message,
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
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
            alt="Signup"
          />
        </div>

        <div className="lg:w-1/2 w-full p-8">
          <h1 className="font-semibold text-2xl lg:text-3xl mb-2">Create an Account</h1>
          <p className="text-gray-600 mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <input
                {...register("userName", { required: "Name is required" })}
                type="text"
                className="outline-none py-2 w-full border-b-2 border-gray-400"
                placeholder="Name"
              />
              {errors.userName && <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                className="outline-none py-2 w-full border-b-2 border-gray-400"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                {...register("password", { required: "Password is required" })}
                type={passView ? "text" : "password"}
                className="outline-none py-2 w-full border-b-2 border-gray-400 pr-10"
                placeholder="Password"
              />
              <span
                onClick={() => setPassView(!passView)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-gray-500"
              >
                {passView ? <IoEyeOutline /> : <RiEyeCloseLine />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn mt-4 btn-primary border-none bg-primary text-white w-full rounded-md py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex gap-2 justify-center items-center">
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Google Sign In */}
            <button
              type="button"
              onClick={handleGoogle}
              className="btn mt-2 btn-outline border border-gray-400 w-full rounded-md flex items-center justify-center gap-2 py-2"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium border-b border-primary hover:opacity-80">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
