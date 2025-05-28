import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Banner1 from '../../assets/new1.png'
import Banner2 from '../../assets/new2.png'
import Banner3 from '../../assets/chicken banner.png'
import Banner4 from '../../assets/Food Facebook Cover.png'

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  const data = {
    image1: Banner4,
    image2: Banner2,
    image3: Banner3,
    image4: Banner1
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: false,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {Object.values(data).map((image, index) => (
          <SwiperSlide key={index}>
    <Link to='/products'>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
            />
    </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
