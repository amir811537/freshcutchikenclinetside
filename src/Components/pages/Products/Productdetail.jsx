import { useEffect, useRef, useState } from "react";
import { GoHeart } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import image from "../../../assets/chickendetail.jpg";

const dummyProduct = {
  title: "Fresh Chicken Meat",
  price: 300,
  discountedPrice: 250,
  description: "This is a delicious and fresh chicken meat product. <br/>Perfect for all your recipes!",
};

const images = [
  { src: image },
  { src: image },
  { src: image },
];

const Productdetail = () => {
  const [loading, setLoading] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const addToWishList = () => {
    alert("Added to wishlist!");
  };

  const addToCart = () => {
    alert("Added to cart!");
  };

  const buyNow = () => {
    alert("Proceeding to buy now!");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
   <div className="max-w-7xl mx-auto">
     <div className="mx-5 lg:mx-auto flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
      {/* Image Section */}
      <div className="max-w-[400px] w-full lg:w-1/3">
        {/* Swiper for Main Image */}
        <div className="bg-[#F5F5F5] flex justify-center items-center h-[400px] mx-auto overflow-hidden">
          <Swiper
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="w-full mySwiper h-full"
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img.src}
                  alt={`Product ${index}`}
                  className="object-contain w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 justify-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover border border-gray-300 cursor-pointer hover:border-black"
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-2/3 space-y-5">
        <h1 className="text-xl text-primary font-medium">{dummyProduct.title}</h1>
        <h1 className="text-3xl font-medium">
          BDT {dummyProduct.discountedPrice || dummyProduct.price}
          {dummyProduct.discountedPrice && (
            <span className="text-[#00000090] line-through ml-4">
              BDT {dummyProduct.price}
            </span>
          )}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
          {/* Wishlist Button */}
          <button
            onClick={addToWishList}
            className="bg-[#F5F5F5] p-2 px-3 flex items-center justify-center rounded-none border w-full md:w-auto text-black hover:bg-gray-200 transition"
          >
            <p className="px-2">Add to Wishlist</p>
            <GoHeart className="text-2xl" />
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={addToCart}
            className="flex justify-center items-center w-full md:w-auto text-white bg-black py-2 md:py-3 rounded-none btn hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          {/* Buy Now Button */}
          <button
            onClick={buyNow}
            className="flex justify-center items-center w-full md:w-auto text-white bg-primary py-2 md:py-3 rounded-none btn btn-error hover:bg-red-700 transition"
          >
            Buy Now
          </button>
        </div>

        <p
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: dummyProduct.description }}
        ></p>
      </div>
    </div>
   </div>
  );
};

export default Productdetail;
