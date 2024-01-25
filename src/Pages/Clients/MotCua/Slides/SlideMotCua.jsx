import React from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Navigation, Pagination } from 'swiper/modules'
import mcTimeLine01 from '../../../../assets/Images/MC_TimeLine01.png'
import mcTimeLine02 from '../../../../assets/Images/MC_TimeLine02.png'
function SlideMotCua() {
  return (
    <div className="px-4 my-10 py-10 shadow-sm rounded-exclude-tl bg-white">
      <Swiper
        pagination={{
          type: 'fraction',
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="rounded-exclude-tl px-10"
      >
        <SwiperSlide>
          <div className="px-10">
            <img src={mcTimeLine01} className="w-full rounded-lg" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="px-10">
            <img src={mcTimeLine02} className="w-full rounded-lg" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SlideMotCua
