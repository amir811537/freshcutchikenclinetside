/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PDFDocument from "./PDFDocument"; // Assume you're using this
import Swal from "sweetalert2";

const CmsDetail = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [editForm, setEditForm] = useState({
    name: "",
    location: "",
    phone: "",
    orderHistory: "",
    sale: "",
    date: "",
  });

  const englishMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://freshcutserverside.vercel.app/cms");
        setAllData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const parseEnglishDate = (dateStr) => {
    if (!dateStr) return { day: "", month: "" };
    const parts = dateStr.split(" ");
    const day = parts[0];
    const month = parts[1]?.replace(",", "");
    return { day, month };
  };

  const filteredData = allData.filter((item) => {
    const { day, month } = parseEnglishDate(item.date);
    const matchMonth = selectedMonth ? month === selectedMonth : true;
    const matchDate = selectedDate ? day === selectedDate : true;
    const matchName = selectedName
      ? item.name.toLowerCase().includes(selectedName.toLowerCase())
      : true;
    return matchMonth && matchDate && matchName;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const blob = await pdf(<PDFDocument data={filteredData} />).toBlob();
      saveAs(blob, "Customer_Report.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
    setLoading(false);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name || "",
      location: item.location || "",
      phone: item.phone || "",
      orderHistory: item.orderHistory || "",
      sale: item.sale || "",
      date: item.date || "",
    });
  };

  const closeModal = () => {
    setEditingItem(null);
  };

  const handleUpdate = async () => {
    const isValidDateFormat = /^\d{1,2} [A-Za-z]+ \d{2}$/.test(editForm.date);
    if (!isValidDateFormat) {
      alert("Date must be in format: 21 May 25");
      return;
    }

    try {
      const res = await axios.patch(
        `https://freshcutserverside.vercel.app/cms/${editingItem._id}`,
        editForm
      );
      if (res.data.modifiedCount > 0) {
        const updated = allData.map((item) =>
          item._id === editingItem._id ? { ...item, ...editForm } : item
        );
        setAllData(updated);
        Swal.fire({
          title: "Update done",
          icon: "success",
        });
        closeModal();
      }
    } catch (err) {
      Swal.fire({
        title: "Update failed",
        icon: "error",
        text: err.message,
      });
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`https://freshcutserverside.vercel.app/cms/${id}`);
          if (res.data.deletedCount > 0) {
            const updated = allData.filter((item) => item._id !== id);
            setAllData(updated);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (err) {
          Swal.fire("Delete failed", err.message, "error");
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Filter by Month, Date and Name</h1>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block mb-1">Select Month</label>
            <select
              className="border px-3 py-1 rounded"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setSelectedDate("");
                setCurrentPage(1);
              }}
            >
              <option value="">-- Month --</option>
              {englishMonths.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Select Date</label>
            <select
              className="border px-3 py-1 rounded"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setCurrentPage(1);
              }}
              disabled={!selectedMonth}
            >
              <option value="">-- Date --</option>
              {[...Array(31)].map((_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Filter by Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="border px-3 py-1 rounded"
              value={selectedName}
              onChange={(e) => {
                setSelectedName(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100 dark:bg-black dark:text-white">
            <tr>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Order</th>
              <th className="border px-2 py-1">Sale</th>
              <th className="border px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="border px-2 py-1">{item.date || "—"}</td>
                <td className="border px-2 py-1">{item.name}</td>
                <td className="border px-2 py-1">{item.location}</td>
                <td className="border px-2 py-1">{item.phone}</td>
                <td className="border px-2 py-1">{item.orderHistory}</td>
                <td className="border px-2 py-1">৳{item.sale}</td>
                <td className="border px-2 py-1 flex justify-center gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-blue-700 text-white font-bold">
              <td colSpan="5" className="px-2 py-2 text-right">Total Sale:</td>
              <td className="px-2 py-2">
                ৳{filteredData.reduce((acc, cur) => acc + parseFloat(cur.sale || 0), 0)}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {filteredData.length > itemsPerPage && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {selectedMonth && (
        <div className="p-4 text-right">
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={loading || filteredData.length === 0}
          >
            {loading ? "Downloading..." : "Download PDF"}
          </button>
        </div>
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Entry</h2>
            {["name", "location", "phone", "orderHistory", "sale", "date"].map((field) => (
              <div key={field} className="mb-3">
                <label className="block capitalize mb-1">{field}</label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  value={editForm[field]}
                  onChange={(e) =>
                    setEditForm({ ...editForm, [field]: e.target.value })
                  }
                  placeholder={field === "date" ? "e.g. 21 May 25" : ""}
                />
              </div>
            ))}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Close
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CmsDetail;
