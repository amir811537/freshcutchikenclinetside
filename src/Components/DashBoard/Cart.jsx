/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useCart from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../../assets/icon/cart.svg";
import Loader from "../Loader/Loader";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: cartData = [], refetchCart, isLoading } = useCart(user?.email);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [localQuantities, setLocalQuantities] = useState({});
const [showWarningModal, setShowWarningModal] = useState(false);

  useEffect(() => {
    const initialQuantities = {};
    cartData.forEach(item => {
      initialQuantities[item._id] = item.quantity ?? 1;
    });
    setLocalQuantities(initialQuantities);
  }, [cartData]);

  const handleLocalQuantityChange = async (id, newQuantity) => {
    const qty = Math.max(0, parseFloat(newQuantity) || 0); // allow 0
    setLocalQuantities(prev => ({
      ...prev,
      [id]: qty
    }));
    try {
      await axios.patch(`https://freshcutserverside.vercel.app/cart/${id}`, { quantity: qty });
      refetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios.delete(`https://freshcutserverside.vercel.app/cart/${deleteId}`)
      .then(() => {
        refetchCart();
        setShowModal(false);
      })
      .catch(err => {
        console.error("Failed to delete item:", err);
        setShowModal(false);
      });
  };

const handleCheckout = () => {
  const allItemsValid = cartData.every(item => (localQuantities[item._id] ?? 0) > 0);

  if (!allItemsValid) {
    setShowWarningModal(true);
    return;
  }

  navigate("/checkout");
};


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <div className="flex justify-center items-center">
    <Loader></Loader>
  </div>;

  return (
    <div className="px-4 lg:px-0 my-10 max-w-full mx-auto dark:bg-gray-900 dark:text-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold font-inter mb-6">
        Cart Items ({cartData.length})
      </h2>

      {cartData.length === 0 ? (
        <div className="w-2/3 flex items-center flex-col my-20 mx-auto text-center">
          <img src={image} className="w-32" alt="Empty Cart" />
          <h1 className="text-xl font-semibold mb-2 font-inter">Your Cart is Empty</h1>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item) => (
              <div
                key={item._id}
                className="flex flex-col gap-3 border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <div>
                      <h3 className="font-semibold text-base">{item.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">৳{item.price} per kg</p>
                    </div>
                  </div>
                  <div className="text-right flex justify-center items-center gap-6">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Total: <span className="font-semibold text-black dark:text-white">৳{(item.price * (localQuantities[item._id] || 0)).toFixed(2)}</span>
                    </p>
                    <button
                      className="text-red-500 hover:text-red-700 text-xl"
                      onClick={() => handleDelete(item._id)}
                      type="button"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-sm text-gray-600 dark:text-gray-300">Quantity (kg):</label>
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={localQuantities[item._id] || 0}
                    onChange={(e) => handleLocalQuantityChange(item._id, e.target.value)}
                    className="border rounded px-2 py-1 w-24 text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              className="px-6 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}

{/* Warning Modal for minimum quantity */}
{showWarningModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Oops!</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Please add at least <span className="font-bold">1 kg</span> of any product to proceed to checkout.
      </p>
      <div className="flex justify-end">
        <button
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-sm"
          onClick={() => setShowWarningModal(false)}
        >
          Okay
        </button>
      </div>
    </div>
  </div>
)}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Are you sure?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">You won't be able to revert this action.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white text-sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
                onClick={confirmDelete}
              >
                Yes, delete it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
