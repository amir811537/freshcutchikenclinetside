import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import image1 from "../../../assets/icon/meat-removebg-preview.png";
import image2 from "../../../assets/icon/icon-chicken-removebg-preview.png";
import data from '../../../../public/data/data.json'
const AllProduct = () => {
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:my-20 max-w-7xl mx-auto my-10 px-5 lg:px-0">
      <div className="relative min-h-[300px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-hidden grid grid-cols-2 md:grid-cols-4 gap-5 mt-10">
            {data.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProduct;
