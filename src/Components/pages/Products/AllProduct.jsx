import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FilterSection from "./FilterSection";
import data from "../../../../public/data/data.json"; // (keep it if static, or move to src/data if dynamic)

const AllProduct = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const uniqueCategories = [...new Set(data.map(item => item.category))];

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
  
  const filteredProducts = selectedCategories.length
    ? data.filter(item => selectedCategories.includes(item.category))
    : data;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Filter Section */}
      <FilterSection
        categories={uniqueCategories}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
      />

      {/* Product Grid */}
      <div className="overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
        {isLoading ? (
          // Show loading skeletons
          [...Array(8)].map((_, index) => (
            <ProductCard key={index} isLoading={true} />
          ))
        ) : (
          // Show actual products
          filteredProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllProduct;
