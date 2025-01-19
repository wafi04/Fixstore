import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetAllProductWithVariants } from "@/features/api/products/product.query";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ButtonView } from "@/components/ui/button/ButtonView";
import { ProductDetails } from "@/types/product";
import CategoryPath from "@/utils/CategoryPath";

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
    <section className="w-full bg-white py-8 sm:py-12 md:py-16 lg:py-20 px-10">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-end lg:space-y-0">
          <div className="space-y-2 sm:space-y-3">
            <span className="inline-block text-xs sm:text-sm font-medium tracking-wider text-gray-500">
              FEATURED COLLECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              Discover Our Finest
            </h2>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg">
            Explore our carefully curated collections featuring the finest in
            luxury fashion and accessories.
          </p>
        </div>
      </div>

      {/* Products Slider */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
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
            320: {
              slidesPerView: 1.2,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          className="pb-12 sm:pb-16">
          {data?.map((product: ProductDetails) => (
            <SwiperSlide key={product.id} className="h-full">
              <div className="group relative h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="relative  w-full overflow-hidden rounded-t-xl">
                  {product.variants[0].image && (
                    <img
                      src={product.variants[0]?.image[0]?.url}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/p/${product.id}`}>
                      <ButtonView />
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3 sm:p-4 space-y-2">
                  <div>
                    <span className="text-xs tracking-wider text-gray-500">
                      {product.category.name}
                    </span>
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <Button
          onClick={handlePrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full size-8 sm:size-10 p-0 bg-white/80 backdrop-blur-sm shadow-md hover:bg-white">
          <ChevronLeft className="size-4 sm:size-6 text-gray-800" />
        </Button>
        <Button
          onClick={handleNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full size-8 sm:size-10 p-0 bg-white/80 backdrop-blur-sm shadow-md hover:bg-white">
          <ChevronRight className="size-4 sm:size-6 text-gray-800" />
        </Button>
      </div>

      {/* View All Button */}
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 text-center px-4">
        <button className="group inline-flex items-center space-x-3 text-gray-900 hover:text-primary-600 transition-colors">
          <span className="text-xs sm:text-sm tracking-wider font-medium">
            VIEW ALL COLLECTIONS
          </span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default FeaturedCollection;
