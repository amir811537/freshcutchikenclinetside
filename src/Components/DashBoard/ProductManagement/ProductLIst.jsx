import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useProducts from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ProductList = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isLoading, isError } = useProducts();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // ✅ Delete mutation with axiosPublic
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosPublic.delete(`/products/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Product has been deleted.", "success");
      queryClient.invalidateQueries(["products"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete product.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );

  if (isError) return <p className="text-red-500">Failed to load products.</p>;

  // ✅ Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <div className="mt-6 p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📦 Product List
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-orange-500 text-white text-left">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Old Price</th>
              <th className="px-4 py-3">Quantity</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Sell Count</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr
                key={product._id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{startIndex + index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-14 h-14 object-cover rounded-md border"
                  />
                </td>
                <td className="px-4 py-2 font-medium">{product.name}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  ৳{product.price}
                </td>
                <td className="px-4 py-2 text-red-500 line-through">
                  ৳{product.oldPrice}
                </td>
                <td className="px-4 py-2">{product.quantity}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.sellCount}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/updateProduct/${product._id}`)
                    }
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
