/* eslint-disable react/prop-types */
// src/components/LoginRegister/LoginRegister.jsx
import { useState, useContext } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const LoginRegister = ({ showModal, setShowModal }) => {
  const { signuprg, createUser, googleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
const axiosPublic = useAxiosPublic();

  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const switchAuthMode = () => setIsSignUp(!isSignUp);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirmPassword = form.get("confirmPassword");

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        timer: 3000,
        showConfirmButton: false,
      });
    }

    createUser(email, password)
      .then(() => {
        const userData = {
          name,
          email,
          method: "email",
          role:"user"
        };

        return axiosPublic.post("/users", userData);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          timer: 3000,
          showConfirmButton: false,
        });
        setShowModal(false);
        navigate(location?.state || "/");
      })
      .catch((error) => {
        // console.log(error)
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: error.message,
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    signuprg(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login successful",
          timer: 3000,
          showConfirmButton: false,
        });
        setShowModal(false);
        navigate(location?.state || "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Email or password incorrect",
          timer: 3000,
          showConfirmButton: false,
        });
      });
  };

  const handleGoogle = () => {
    googleSignin()
      .then((result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          method: "google",
          role:"user"
        };

        return axiosPublic.post("/users", googleUser);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Google sign-in successful",
          timer: 3000,
          showConfirmButton: false,
        });
        setShowModal(false);
        navigate(location?.state || "/");
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

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-black rounded-lg shadow-lg p-8 w-96 relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        <form onSubmit={isSignUp ? handleRegister : handleLogin}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 mb-4 border rounded"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            required
          />

          {/* Password */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full p-2 border rounded pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {isSignUp && (
            <div className="relative mb-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full p-2 border rounded pr-10"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

      <button
              type="button"
              onClick={handleGoogle}
              className="btn btn-outline border  border-gray-400 text-gray-700 w-full py-2 my-2 rounded-md flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>

        <div className="text-sm mt-4 text-center">
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <button
                onClick={switchAuthMode}
                className="text-[#F5BC3B] hover:underline"
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don’t have an account?{" "}
              <button
                onClick={switchAuthMode}
                className="text-[#F5BC3B] hover:underline"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
