/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart"; // ✅ import the hook

const ProductCard = ({ item, isLoading }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { refetchCart } = useCart(user?.email); // ✅ use the hook

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartData = {
      name: item.name,
      image: item.image,
      price: item.price,
      email: user.email,
      quantity: 1,
    };

    try {
      const response = await axios.post("https://freshcutserverside.vercel.app/cart", cartData);
      refetchCart(); // ✅ refetch cart data
      Swal.fire({
        icon: "success",
        title: "Product is added to cart",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Product add failed",
        text: error.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const cartData = {
      name: item.name,
      image: item.image,
      price: item.price,
      email: user.email,
      quantity: 1,
    };

    try {
      const response = await axios.post("https://freshcutserverside.vercel.app/cart", cartData);
      refetchCart(); // ✅ refetch cart data
      navigate("/dashboard/cart");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Product add failed",
        text: error.message,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const shortDescription = item?.description
    ? item.description.split(" ").slice(0, 10).join(" ") + "..."
    : "";

  if (isLoading) {
    return (
      <div className="card bg-base-100 w-auto border shadow-sm animate-pulse">
        <figure>
          <div className="bg-gray-300 lg:w-[303px] lg:h-[227px] w-40 h-40"></div>
        </figure>
        <div className="card-body space-y-4">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <div className="h-4 bg-gray-300 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="h-3 bg-gray-300 rounded w-full mb-1"></div>
            <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
          <div className="flex lg:flex-row flex-col gap-5">
            <div className="h-10 bg-gray-300 rounded w-full lg:w-1/2"></div>
            <div className="h-10 bg-gray-300 rounded w-full lg:w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 w-auto border shadow-sm">
      <Link to={`/productdetail/${item._id}`}>
        <figure>
          <img
            className="lg:w-[303px] lg:h-[227px] w-40 h-40 object-cover"
            src={item.image}
            alt={item.title || "Product Image"}
          />
        </figure>
      </Link>
      <div className="card-body">
        <Link to={`/productdetail/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <span className="text-xl font-bold text-red-600">৳{item.price} kg</span>
            <span className="line-through text-gray-500 dark:text-white text-sm">৳{item.oldPrice}</span>
          </div>
        </div>
        <div
  className="hidden lg:block text-sm text-gray-600 dark:text-white"
  dangerouslySetInnerHTML={{ __html: shortDescription }}
></div>

        <div className="flex lg:flex-row flex-col gap-5 justify-between items-center w-full">
          <button
            onClick={handleAddToCart}
            className="btn bg-[#F5BC3B] hover:bg-green-400 text-white w-full lg:w-auto"
          >
            Add to cart
          </button>
          <button
            onClick={handleBuyNow}
            className="btn bg-[#F5BC3B] hover:bg-green-400 text-white w-full lg:w-auto"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number.isRequired,
    oldPrice: PropTypes.number,
    discount: PropTypes.number,
    description: PropTypes.string,
    _id: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
};

export default ProductCard;
