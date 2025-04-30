import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // Fetch cart data by user email
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:5000/cart?email=${user.email}`)
        .then(res => setCartData(res.data))
        .catch(err => console.error("Error fetching cart:", err));
    }
  }, [user]);

  // Update quantity
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = parseFloat(newQuantity) || 1;

    setCartData(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity } : item
      )
    );

    axios.patch(`http://localhost:5000/cart/${id}`, { quantity })
      .catch(err => console.error("Failed to update quantity:", err));
  };

  // Delete product with Swal confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/cart/${id}`)
          .then(() => {
            setCartData(prev => prev.filter(item => item._id !== id));
            Swal.fire({
              title: "Removed!",
              text: "This product has been removed.",
              icon: "success"
            });
          })
          .catch(err => console.error("Failed to delete item:", err));
      }
    });
  };

  // Totals
  const cartTotal = cartData.reduce((acc, item) => acc + parseInt(item.price) * item.quantity, 0);
  const shipping = 0;
  const discount = 0;
  const discountedCartTotal = Math.round((cartTotal + shipping) * (1 - discount / 100));

  return (
    <div className='px-5 lg:px-0 my-10 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-semibold font-inter mb-6'>Billing Details</h1>
      <form className='flex flex-col lg:flex-row justify-between gap-10'>

        {/* Billing Info */}
        <div className='flex-1 space-y-6'>
          <div>
            <label className='text-[#00000090]'>Name<sup className='text-red-500'>*</sup></label>
            <input type="text" required className="input w-full bg-[#F5F5F5] mt-2" />
          </div>
          <div>
            <label className='text-[#00000090]'>Address<sup className='text-red-500'>*</sup></label>
            <input type="text" required className="input w-full bg-[#F5F5F5] mt-2" />
          </div>
          <div>
            <label className='text-[#00000090]'>Apartment, Road, Floor (Optional)</label>
            <input type="text" className="input w-full bg-[#F5F5F5] mt-2" />
          </div>
          <div>
            <label className='text-[#00000090]'>Phone Number<sup className='text-red-500'>*</sup></label>
            <input type="tel" required className="input w-full bg-[#F5F5F5] mt-2" />
          </div>
          <div>
            <label className='text-[#00000090]'>Email<sup className='text-red-500'>*</sup></label>
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
                <div className="flex items-center gap-4">
                  <p className='font-semibold'>৳{item.price * item.quantity}</p>
                  <button
                    className="text-red-500 text-2xl font-bold hover:text-red-700"
                    type="button"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
              <div className='flex items-center gap-3'>
                <label className='text-sm text-gray-600'>Quantity (kg):</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  className="input input-bordered w-24"
                />
              </div>
            </div>
          ))}

          <div className="pt-6 space-y-4 border-t">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>৳{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>৳{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>{discount}%</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>৳{discountedCartTotal}</span>
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
    </div>
  );
};

export default Checkout;
