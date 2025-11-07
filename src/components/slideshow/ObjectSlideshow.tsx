'use client';
import { useState } from 'react';

import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


import './slideshow.css';
import Image from 'next/image';


interface Props {
  images: string[];
  title: string;
  className?: string;
}

const ObjectSlideshow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#7c7c7c',
          '--swiper-pagination-color': '#7c7c7c',
        } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 rounded"
      >

        {images.map((image, idx) => (
          // 887 × 591 px
          <SwiperSlide key={image}>
            <Image
              src={`/properties/${image}`}
              alt={title}
              width={1024}
              height={800}
              className="object-cover rounded w-full h-auto"
              loading={idx === 0 ? "eager" : "lazy"}
              priority={idx === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

     <div className='w-[887px] max-w-full mx-auto'>
       <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-1"
      >
        {images.map(image => (
          <SwiperSlide key={image}>
            <Image
              src={`/properties/${image}`}
              alt={title}
              width={200}
              height={200}
              className="object-cover w-full h-auto"
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='w-full h-px border mt-1'/>
     </div>
    </div>
  )
}

export default ObjectSlideshow
