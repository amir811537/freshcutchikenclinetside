import { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CmsHome = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    phone: "",
    orderHistory: "",
    sale: "",
    date: null, // Use null for DatePicker
  });
const axiosPublic = useAxiosPublic();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.toString(),
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date) {
      Swal.fire({
        title: "Error!",
        text: "Please select a date.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    // Format date as "01 September 25"
    const formattedDate = formData.date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "2-digit",
    });

    const newEntry = { ...formData, date: formattedDate };

    try {
      await axiosPublic.post("/cms", newEntry);
 
Swal.fire({
        position: "top-center",
        icon: "success",
        title: "data post successfully",
        showConfirmButton: false,
        timer: 1000
      });

      setFormData({
        name: "",
        location: "",
        phone: "",
        orderHistory: "",
        sale: "",
        date: null,
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
      <div className="w-full bg-white dark:bg-black dark:text-white p-6">
        <h2 className="text-2xl font-bold mb-4">Add Customer Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* React DatePicker */}
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="dd MMMM yy"
            placeholderText="Select a date"
            className="w-full border p-2 rounded"
            required
          />

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
            type="number"
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
