import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import data from '../../../public/data/data.json';

const Categoris = () => {
  const swiperRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate loading effect
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // simulate 1s loading
    return () => clearTimeout(timer);
  }, []);

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Map(data.map(item => [item.category, { category: item.category, categoryImage: item.categoryImage }]))
    .values()
  );

  const handleSelectCategory = (category) => {
    console.log("Selected Category:", category);
    // You can add navigation or filtering logic here
  };

  const slidePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  const slideNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="my-12 p-5 lg:p-0">
      <div className="flex">
        <span className="p-2 rounded-sm bg-[#F5BC3B]"></span>
        <h1 className="text-xl font-medium border-l-[#F5BC3B] border-l- pl-4">
          Categories
        </h1>
      </div>

      <div className="flex justify-between items-center my-10">
        <h1 className="text-xl lg:text-4xl font-medium font-inter">
          Browse By Category
        </h1>
        <div className="flex items-center gap-4">
          <button className="bg-base-200 rounded-full p-4" onClick={slidePrev}>
            <FaArrowLeftLong className="text-xl lg:text-2xl" />
          </button>
          <button className="bg-base-200 rounded-full p-4" onClick={slideNext}>
            <FaArrowRightLong className="text-xl lg:text-2xl" />
          </button>
        </div>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {/* Skeleton loading for categories */}
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex flex-col items-center justify-center border border-gray-300 rounded-md text-center p-2 h-44 w-28 md:w-44 md:h-44 bg-gray-100 animate-pulse">
                <div className="w-14 h-14 md:w-28 md:h-28 bg-gray-300 rounded-full mb-2"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            ref={swiperRef}
            spaceBetween={20}
            breakpoints={{
              300: { slidesPerView: 3 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 6 }
            }}
          >
            {uniqueCategories.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to="/" onClick={() => handleSelectCategory(item.category)}>
                  <div className="flex flex-col items-center justify-center border hover:text-white border-gray-300 rounded-md text-center p-2 lg:p-0 h-44 w-28 md:w-44 md:h-44 bg-white hover:bg-[#F5BC3B] shadow-sm hover:shadow-md transition">
                    <img
                      src={item.categoryImage}
                      alt={item.category}
                      className="lg:w-28 lg:h-28 w-14 h-14 object-contain mb-2"
                    />
                    <h1 className="text-sm font-medium">{item.category}</h1>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Categoris;
