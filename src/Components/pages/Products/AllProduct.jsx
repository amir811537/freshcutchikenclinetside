import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import FilterSection from "./FilterSection";

const AllProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const location = useLocation(); // fix for location

  // Fetch products using React Query
  const { isPending, data: products, isError } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:5000/products');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const uniqueCategories = [...new Set(products?.map(item => item.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = selectedCategories.length
    ? products?.filter(item => selectedCategories.includes(item.category))
    : products;

  if (isPending) {
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

  if (isError) {
    return (
      <div className="p-4 max-w-7xl mx-auto text-center">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
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
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
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
