import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const postProduct = async (product) => {
  const res = await fetch("http://localhost:5000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to add product");
  }

  return res.json();
};

const useAddProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Product Added",
        text: "Your product has been successfully added.",
        confirmButtonColor: "#DB4444",
      });
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong!",
      });
    },
  });
};

export default useAddProduct;
