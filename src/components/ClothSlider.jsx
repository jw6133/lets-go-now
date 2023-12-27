import React from 'react'
import {Swiper,SwiperSlide} from 'swiper/react'; 
import 'swiper/css'; 
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination'; 


const slider={
    width:"100px",
    height:"100px",
}
const items=[
    {src:"../clothicon/four/glove.png"},
    {src:"../clothicon/four/scarf.png"}
]
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
      {items.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <img src={item.src} />
            </SwiperSlide>
          );
        })}
            </Swiper>
        </>
    )
}

export default ClothSlider
