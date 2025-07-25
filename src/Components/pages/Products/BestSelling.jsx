// src/components/BestSelling/BestSelling.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductCard from "./ProductCard";
import useProducts from "../../../hooks/useProducts";

const BestSelling = () => {
  const { data: products = [], isPending } = useProducts();
  const [showAll, setShowAll] = useState(false);

  // Show only the first 8 initially
  const visibleProducts = showAll ? products : products.slice(0, 12);

  return (
    <div className="lg:my-20 max-w-7xl mx-auto my-10 px-5 lg:px-0">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex">
            <span className="p-2 rounded-sm bg-[#F5BC3B]"></span>
            <h1 className="text-xl font-medium border-l-[#F5BC3B] border-l pl-4">
              This Month
            </h1>
          </div>
          <h1 className="text-2xl lg:text-4xl mt-4 lg:mt-10 font-medium font-inter">
            Our Products
          </h1>
        </div>
        <Link
          to="/products"
          className="btn btn-error px-8 text-white bg-[#F5BC3B] rounded-sm"
        >
          View All
        </Link>
      </div>

      <div className="relative">
        <div className="overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
          {isPending ? (
            [...Array(4)].map((_, index) => (
              <div key={index}>
                <div className="skeleton w-full h-[250px] mt-5 rounded-sm"></div>
                <div className="skeleton w-full h-[50px] mt-2 rounded-sm bg-yellow-300"></div>
                <div className="skeleton w-full h-[15px] mt-5 rounded-sm"></div>
                <div className="skeleton w-full h-[20px] mt-8 rounded-sm"></div>
              </div>
            ))
          ) : (
            visibleProducts.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))
          )}
        </div>

        {!isPending && !showAll && products.length > 12 && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="btn px-8 text-white bg-[#F5BC3B] hover:bg-yellow-400 rounded-sm"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSelling;
