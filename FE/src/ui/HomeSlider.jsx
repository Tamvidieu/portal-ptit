import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "https://asset.gecdesigns.com/img/background-templates/abstract-navy-red-background-design-sr17012401-1705501852665-cover.webp", // 📸 Đường dẫn tương đối hoặc public URL
  "https://toigingiuvedep.vn/wp-content/uploads/2021/02/background-anh-sang-cho-video.jpg",
];

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <div className="w-full max-h-[600px] overflow-hidden">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className="w-full h-[600px] object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
