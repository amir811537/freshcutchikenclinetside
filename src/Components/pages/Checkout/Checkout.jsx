/* eslint-disable react/no-unescaped-entities */
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { MdDelete } from "react-icons/md";
import useCart from '../../../hooks/useCart';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data: cartData = [], refetchCart, isLoading } = useCart(user?.email);

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fullOrder = {
        customer: {
          name,
          address,
          apartment,
          phone,
          email: user?.email,
        },
        items: cartData.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          image: item.image,
        })),
        status: "pending",
        totalAmount: discountedCartTotal,
        paymentMethod,
        orderDate: new Date().toISOString()
      };

      await axios.post("https://freshcutserverside.vercel.app/order", fullOrder);
      await axios.delete(`https://freshcutserverside.vercel.app/cart?email=${user.email}`);
      
      navigate("/dashboard/order-success", { state: { fullOrder } });

     
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order.");
    }
  };

  const cartTotal = cartData.reduce((acc, item) => {
    const qty = item.quantity || 1;
    return acc + parseFloat(item.price) * qty;
  }, 0);

  const totalQuantity = cartData.reduce((acc, item) => acc + (item.quantity || 1), 0);
const shipping = totalQuantity >= 5 ? 0 : 60;
  const discount = 0;
  const discountedCartTotal = Math.round((cartTotal + shipping) * (1 - discount / 100));

  if (isLoading) return <p className="text-center mt-10">Loading cart...</p>;
  return (
    <div className='px-5 lg:px-0 my-10 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-semibold font-inter mb-6 '>Billing Details</h1>
      <form className='flex flex-col lg:flex-row justify-between gap-10' onSubmit={handleSubmit}>
        {/* Billing Info */}
        <div className='flex-1 space-y-6'>
          <div>
            <label className='text-[#00000090] dark:text-white'>Name<sup className='text-red-500'>*</sup></label>
            <input type="text" required className="input w-full bg-[#F5F5F5] dark:text-yellow-300 mt-2" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className='text-[#00000090] dark:text-white'>Address<sup className='text-red-500'>*</sup></label>
            <input type="text" required className="input w-full bg-[#F5F5F5] dark:text-yellow-300 mt-2" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label className='text-[#00000090] dark:text-white'>Apartment, Road, Floor (Optional)</label>
            <input type="text" className="input w-full bg-[#F5F5F5] dark:text-yellow-300 mt-2" value={apartment} onChange={(e) => setApartment(e.target.value)} />
          </div>
          <div>
            <label className='text-[#00000090] dark:text-white'>Phone Number<sup className='text-red-500'>*</sup></label>
            <input type="tel" required className="input w-full bg-[#F5F5F5] dark:text-yellow-300 mt-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className='text-[#00000090] dark:text-white'>Email<sup className='text-red-500'>*</sup></label>
            <input type="email" value={user?.email} disabled className="input w-full bg-[#F5F5F5] mt-2" />
          </div>
        </div>

        {/* Cart & Payment */}
        <div className='flex-1 space-y-5'>
          {cartData.map((item) => (
            <div key={item._id} className='flex flex-col gap-2 border-b pb-4'>
              <div className='flex items-center justify-between'>
                <div className='flex gap-4 items-center'>
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  <div>
                    <h2 className='font-medium'>{item.name}</h2>
                    <p className='text-sm text-gray-500'>৳{item.price} per kg</p>
                  </div>
                </div>
                <div className="flex justify-center items-end">
                  <p className='font-semibold'>
                    ৳{item.price} × {item.quantity || 1} kg = ৳{(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                  <button
                    className="text-red-500 text-2xl font-bold hover:text-red-700"
                    type="button"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="pt-6 space-y-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>৳{shipping}</span>
            </div>
            {shipping === 0 && (
              <p className="text-green-600 text-sm">You got free shipping for ordering more than 5 kg!</p>
            )}
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>{discount}%</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>৳{discountedCartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className='pt-6'>
            <h2 className="font-medium mb-2">Payment Method</h2>
            <label className='flex items-center gap-2'>
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>
            <label className='flex items-center gap-2'>
              <input
                type="radio"
                name="payment"
                value="Bkash"
                onChange={() => setPaymentMethod("Bkash")}
              />
              Online Payment (Send money)
            </label>
            {paymentMethod === "Bkash" && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Bkash/Nagad: 01336100836</p>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-full mt-6">
            Place Order
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure?</h2>
            <p className="text-gray-600 mb-6">You won't be able to revert this action.</p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
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

export default Checkout;
