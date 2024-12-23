"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllProductWithVariants } from "@/features/api/products/product.query";

import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FormatPrice } from "@/utils/FormatPrice";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ButtonView } from "@/components/ui/button/ButtonView";

const FeaturedCollection = () => {
  const { data } = useGetAllProductWithVariants();
  const swiperRef = useRef<SwiperRef>(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <section className="w-full bg-white py-20">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-16 px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="text-sm font-medium tracking-wider text-gray-500">
              FEATURED COLLECTIONS
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light">
              Discover Our Finest
            </h2>
          </div>
          <p className="text-gray-600 max-w-lg text-sm md:text-base">
            Explore our carefully curated collections featuring the finest in
            luxury fashion and accessories.
          </p>
        </div>
      </div>

      {/* Products Slider */}
      <div className="relative">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={false}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (className) {
              return `<span class="${className} bg-gray-300 hover:bg-gray-500"></span>`;
            },
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="container pb-16">
          {data?.map((product) => (
            <SwiperSlide key={product.id} className="p-10 md:p-0">
              <div className="group relative  overflow-hidden bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-[350px] w-full overflow-hidden rounded-t-xl ">
                  <img
                    src={
                      product.variants[0]?.image[0]?.url || "/placeholder.jpg"
                    }
                    alt={product.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/p/${product.id}`}>
                      <ButtonView />
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <div>
                    <span className="text-xs  tracking-wider text-gray-500">
                      {product.category.name}
                    </span>
                    <h3 className="text-lg  text-gray-900 mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between border-t pt-3 mt-3">
                    <span className="text-xl  text-gray-900">
                      {FormatPrice(product.price)}
                    </span>
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-800 group">
                      <span className="text-sm font-medium">Add to Cart</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-10 p-0 bg-white shadow-md hover:bg-gray-100">
          <ChevronLeft className="size-6 text-gray-800" />
        </Button>
        <Button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full size-10 p-0 bg-white shadow-md hover:bg-gray-100">
          <ChevronRight className="size-6 text-gray-800" />
        </Button>
      </div>

      <div className="max-w-7xl mx-auto mt-16 text-center">
        <button className="group inline-flex items-center space-x-4 text-gray-900 hover:text-primary-600 transition-colors">
          <span className="text-sm tracking-wider font-medium">
            VIEW ALL COLLECTIONS
          </span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedCollection;
