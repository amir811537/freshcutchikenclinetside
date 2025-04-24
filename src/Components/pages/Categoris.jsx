import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import category1 from '../../assets/icon/icon-chicken-removebg-preview.png';
import category2 from '../../assets/icon/meat-removebg-preview.png';

const Categoris = () => {
  const swiperRef = useRef(null);

  const data = [
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    },
    {
      imageurl: category1,
      title: "Chicken & Poultry"
    },
    {
      imageurl: category2,
      title: "Meat"
    }
    // Add more categories if needed
  ];

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
          {data.map((item, index) => (
          <SwiperSlide key={index}>
          <Link to="/" onClick={() => handleSelectCategory(item.title)}>
            <div className="flex flex-col items-center justify-center border hover:text-white border-gray-300 rounded-md text-center p-4 h-44 w-28 md:w-44 md:h-44 bg-white hover:bg-[#F5BC3B] shadow-sm hover:shadow-md transition">
              <img src={item.imageurl} alt={item.title} className="w-14 h-14 object-contain mb-2" />
              <h1 className="text-sm font-medium">{item.title}</h1>
            </div>
          </Link>
        </SwiperSlide>
        
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categoris;
