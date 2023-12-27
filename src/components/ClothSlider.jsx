import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import 'swiper/css'; 
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 


const slider={
    width:"100px",
    height:"100px",
}
const ClothSlider=()=> {
    return (
        <>
            <Swiper
                style={slider}
                slidesPerView={1}
                loop
                modules={[Autoplay]}
                autoplay={{delay:1000}}
                spped={1000}
    >
      <SwiperSlide>
        <img src='../clothicon/16_9/leather_jacket.png'/>
      </SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
        </>
    )
}

export default ClothSlider
