'use client';

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


import './slideshow.css';
import Image from 'next/image';


interface Props {
  images: string[];
  title: string;
  className?: string;
}

const ObjectMobileSlideshow = ({ images, title, className }: Props) => {



  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px'
        }}
        pagination
        modules={[FreeMode, Pagination]}
        className="mySwiper2"
      >

        {images.map((image, idx) => (
          <SwiperSlide key={image}>
            <Image
              src={`/properties/${image}`}
              alt={title}
              width={600}
              height={500}
              className="object-cover w-full h-auto"
              loading={idx === 0 ? "eager" : "lazy"}
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default ObjectMobileSlideshow;
