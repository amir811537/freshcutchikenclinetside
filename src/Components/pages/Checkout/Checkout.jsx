import { useState, useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  
  // Example cart data
  const cartData = [
    {
      "_id": "6811e5e6c29992c86f8dff32",
      "name": "Drumstick (Skin Off)",
      "image": "https://i.ibb.co.com/KpzVz77K/08-removebg-preview.png",
      "price": "390",
      "email": "freshcutchickenservice@gmail.com"
    },
    {
      "_id": "6811e638c29992c86f8dff33",
      "name": "Broiler Curry Cut (Skin On)",
      "image": "https://i.ibb.co.com/zTfLbqkL/boiler-chieken-carry-cut.jpg",
      "price": "300",
      "email": "somrat420@gmail.com"
    },
    {
      "_id": "6811e783c29992c86f8dff34",
      "name": "Broiler Curry Cut (Skin On)",
      "image": "https://i.ibb.co.com/zTfLbqkL/boiler-chieken-carry-cut.jpg",
      "price": "300",
      "email": "somrat420@gmail.com"
    }
  ];

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const cartTotal = cartData.reduce((acc, item) => acc + parseInt(item.price), 0);
  const shipping = 60;
  const discount = 5; // 5% discount
  const discountedCartTotal = Math.round((cartTotal + shipping) * (1 - discount / 100));

  return (
    <div className='px-5 lg:px-0 my-10 max-w-7xl mx-auto'>
      <h1 className='text-2xl font-semibold font-inter mb-6'>Billing Details</h1>
      <form className='flex flex-col lg:flex-row justify-between gap-10'>
        
        {/* Left side - Billing info */}
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

        {/* Right side - Cart & payment */}
        <div className='flex-1 space-y-5'>
          {cartData.map((item) => (
            <div key={item._id} className='flex items-center justify-between border-b pb-4'>
              <div className='flex gap-4 items-center'>
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                <h2 className='font-medium'>{item.name}</h2>
              </div>
              <p className='font-semibold'>৳{item.price}</p>
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
              <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
              Cash on Delivery
            </label>
            <label className='flex items-center gap-2'>
              <input type="radio" name="payment" value="Bkash" onChange={() => setPaymentMethod("Bkash")} />
              Online Payment (Send money)
            </label>
            {paymentMethod === "Bkash" && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Bkash: 01795044545</p>
                <p>Nagad: 01904722779</p>
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
