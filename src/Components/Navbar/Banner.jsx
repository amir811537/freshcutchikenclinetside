import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
  import { useMemo } from "react";
import Banner1 from "../../assets/new1.png";
import Banner3 from "../../assets/chicken banner.png";
import Banner4 from "../../assets/freshcutorginal.png";
import Banner5 from "../../assets/QR/new.png";
import Banner2 from "../../assets/QR/green-cover-photo.jpg";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Banner = () => {
  // ✅ Banner data
  const initialData = useMemo(
    () => [Banner4, Banner2, Banner3, Banner1, Banner5],
    []
  );
  const [banners, setBanners] = useState([]);

  // ✅ Load cached banners
  useEffect(() => {
    const cached = localStorage.getItem("banners");
    if (cached) {
      setBanners(JSON.parse(cached));
    } else {
      // First time → save banners
      localStorage.setItem("banners", JSON.stringify(initialData));
      setBanners(initialData);
    }
  }, [initialData]);

  // ✅ Update cache if images change
  useEffect(() => {
    const cached = localStorage.getItem("banners");
    const cachedData = cached ? JSON.parse(cached) : [];

    if (JSON.stringify(initialData) !== JSON.stringify(cachedData)) {
      localStorage.setItem("banners", JSON.stringify(initialData));
      setBanners(initialData);
    }
  }, [initialData]);

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
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {banners.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Banner ${index + 1}`}
              className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
