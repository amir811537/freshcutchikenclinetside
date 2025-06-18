import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useProducts from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

const ProductList = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`https://freshcutserverside.vercel.app/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      return res.json();
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
      text: "You won't be able to revert this!",
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

  if (isLoading) return <div>
    <div className="flex justify-center items-center">
    <Loader></Loader>
  </div> </div> ;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="table table-zebra w-full">
        <thead className="bg-orange-400 text-white">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Sell Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td>{product.name}</td>
              <td>৳{product.price}</td>
              <td className="line-through text-red-500">৳{product.oldPrice}</td>
              <td>{product.quantity}</td>
              <td>{product.category}</td>
              <td>{product.sellCount}</td>
              <td className="space-x-2">
              <button
  onClick={() => navigate(`/dashboard/updateProduct/${product._id}`)}
  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
>
  Update
</button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
