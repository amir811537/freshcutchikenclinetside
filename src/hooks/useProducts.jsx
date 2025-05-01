// src/hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";

const fetchProducts = async () => {
  const res = await fetch('http://localhost:5000/products');
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
  });
};

export default useProducts;
