import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const CmsHome = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    orderHistory: "",
    sale: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toString(),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    });

    const newEntry = { ...formData, date: formattedDate };

    try {
      await axios.post("https://freshcutserverside.vercel.app/cms", newEntry);
      Swal.fire({
        title: "Success!",
        text: "Customer data has been added.",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      setFormData({
        name: "",
        location: "",
        phone: "",
        orderHistory: "",
        sale: "",
      });
    } catch (err) {
      console.error("Error submitting data:", err);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit customer data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <div className="w-full max-w-4xl bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Add Customer Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer's full name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="orderHistory"
            value={formData.orderHistory}
            onChange={handleChange}
            placeholder="Describe the customer's previous orders"
            className="w-full h-48 lg:h-[300px] border p-2 rounded"
            required
          />
          <input
            type="number"
            name="sale"
            value={formData.sale}
            onChange={handleChange}
            placeholder="Enter sale amount (৳)"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Data
          </button>
        </form>
      </div>
    </div>
  );
};

export default CmsHome;
