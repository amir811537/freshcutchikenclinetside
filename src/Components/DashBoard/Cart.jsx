/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useCart from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: cartData = [], refetchCart, isLoading } = useCart(user?.email);

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [localQuantities, setLocalQuantities] = useState({});

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
      await axios.patch(`http://localhost:5000/cart/${id}`, { quantity: qty });
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
    axios.delete(`http://localhost:5000/cart/${deleteId}`)
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
    const validItems = cartData.filter(item => localQuantities[item._id] > 0);
    if (validItems.length === 0) {
      alert("Please add at least one kg .");
      return;
    }
    navigate("/checkout");
  };

  if (isLoading) return <p className="text-center mt-10">Loading cart...</p>;

  return (
<div className="px-4 lg:px-0 my-10 max-w-5xl mx-auto">
  <h2 className="text-xl font-semibold font-inter mb-6">
    Cart Items ({cartData.length})
  </h2>

  <div className="space-y-6">
    {cartData.map((item) => (
      <div key={item._id} className="flex flex-col gap-3 border rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
            <div>
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-sm text-gray-500">৳{item.price} per kg</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Total: <span className="font-semibold text-black">৳{(item.price * (localQuantities[item._id] || 0)).toFixed(2)}</span>
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
          <label className="text-sm text-gray-600">Quantity (kg):</label>
          <input
            type="number"
            min="0"
            step="0.5"
            value={localQuantities[item._id] || 0}
            onChange={(e) => handleLocalQuantityChange(item._id, e.target.value)}
            className="border rounded px-2 py-1 w-24 text-sm"
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

  {/* Delete Confirmation Modal */}
  {showModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
        <p className="text-gray-600 mb-6">You won't be able to revert this action.</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm"
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
