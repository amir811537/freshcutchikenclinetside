// src/pages/Products/AllProduct.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import ProductCard from "./ProductCard";
import FilterSection from "./FilterSection";

const AllProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category");

  // ✅ useProducts fetches from API
  const { isPending, data: fetchedProducts = [], isError } = useProducts();

  // ✅ Local state for cached products
  const [products, setProducts] = useState([]);

  // Load cached data on first render
  useEffect(() => {
    const cached = localStorage.getItem("products");
    if (cached) {
      setProducts(JSON.parse(cached));
    }
  }, []);

  // Update cache when API data changes
  useEffect(() => {
    if (fetchedProducts.length > 0) {
      const cached = localStorage.getItem("products");
      const cachedData = cached ? JSON.parse(cached) : [];

      // compare before updating
      if (JSON.stringify(fetchedProducts) !== JSON.stringify(cachedData)) {
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
        setProducts(fetchedProducts);
      }
    }
  }, [fetchedProducts]);

  // Handle initial category from query
  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  const uniqueCategories = [...new Set(products.map((item) => item.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products.filter((item) => selectedCategories.includes(item.category))
    : products;

  // Loading state
  if (isPending && products.length === 0) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          {[...Array(8)].map((_, index) => (
            <ProductCard key={index} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError && products.length === 0) {
    return (
      <div className="p-4 max-w-7xl mx-auto text-center">
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filter Section */}
      <FilterSection
        categories={uniqueCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
