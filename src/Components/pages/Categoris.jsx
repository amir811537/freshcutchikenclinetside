import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import useProducts from "../../hooks/useProducts";

const Categories = () => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();
  const { data: products = [], isLoading, isError } = useProducts();

  // ✅ Local state for categories
  const [categories, setCategories] = useState([]);

  // ✅ Load cached categories from localStorage
  useEffect(() => {
    const cached = localStorage.getItem("categories");
    if (cached) {
      setCategories(JSON.parse(cached));
    }
  }, []);

  // ✅ Update cache only when products change
  useEffect(() => {
    if (products.length > 0) {
      const categoryMap = new Map();
      products.forEach(({ category, categoryImage }) => {
        if (!categoryMap.has(category)) {
          categoryMap.set(category, { category, categoryImage });
        }
      });
      const uniqueCategories = Array.from(categoryMap.values());

      // Compare with cached categories
      const cached = localStorage.getItem("categories");
      const cachedData = cached ? JSON.parse(cached) : [];

      if (JSON.stringify(uniqueCategories) !== JSON.stringify(cachedData)) {
        localStorage.setItem("categories", JSON.stringify(uniqueCategories));
        setCategories(uniqueCategories);
      }
    }
  }, [products]);

  // Handlers
  const handleSelectCategory = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };
  const slidePrev = () => swiperRef.current.swiper.slidePrev();
  const slideNext = () => swiperRef.current.swiper.slideNext();

  // Skeleton Loader
  const renderSkeleton = () => (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center border border-gray-200 rounded-xl text-center p-4 h-44 bg-gray-100 animate-pulse"
        >
          <div className="w-16 h-16 bg-gray-300 rounded-full mb-3"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="mt-8 px-5 lg:px-0">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="block w-4 h-4 rounded-sm bg-[#F5BC3B]" />
          <h1 className="text-xl font-semibold py-2">Categories</h1>
        </div>

        {/* Arrows for Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="bg-gray-100 dark:bg-black dark:text-white rounded-full p-4 hover:bg-[#F5BC3B] transition"
            onClick={slidePrev}
          >
            <FaArrowLeftLong className="text-lg" />
          </button>
          <button
            className="bg-gray-100 dark:bg-black dark:text-white rounded-full p-4 hover:bg-[#F5BC3B] transition"
            onClick={slideNext}
          >
            <FaArrowRightLong className="text-lg" />
          </button>
        </div>
      </div>

      {/* Content */}
      {isError ? (
        <p className="text-red-500">Failed to load categories.</p>
      ) : isLoading && categories.length === 0 ? ( // show skeleton only first time
        renderSkeleton()
      ) : (
        <>
          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <Swiper
              modules={[Navigation]}
              ref={swiperRef}
              spaceBetween={15}
              breakpoints={{
                300: { slidesPerView: 3 },
                480: { slidesPerView: 4 },
              }}
            >
              {categories.map((item, index) => (
                <SwiperSlide key={index}>
                  <button
                    onClick={() => handleSelectCategory(item.category)}
                    className="w-full"
                  >
                    <div className="group flex flex-col items-center justify-center h-36 border rounded-xl bg-white hover:bg-[#F5BC3B] shadow-sm hover:shadow-md transition duration-300">
                      <img
                        src={item.categoryImage}
                        alt={item.category}
                        className="w-16 h-16 object-contain transition-transform group-hover:scale-105"
                      />
                      <h1 className="text-sm font-medium text-gray-800 group-hover:text-white mt-2 truncate">
                        {item.category}
                      </h1>
                    </div>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-6">
            {categories.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelectCategory(item.category)}
                className="w-full"
              >
                <div className="group flex flex-col items-center justify-center h-44 border rounded-xl bg-white hover:bg-[#F5BC3B] shadow-sm hover:shadow-md transition duration-300">
                  <img
                    src={item.categoryImage}
                    alt={item.category}
                    className="w-20 h-20 object-contain transition-transform group-hover:scale-105"
                  />
                  <h1 className="text-base font-medium text-gray-800 group-hover:text-white mt-3 truncate">
                    {item.category}
                  </h1>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
