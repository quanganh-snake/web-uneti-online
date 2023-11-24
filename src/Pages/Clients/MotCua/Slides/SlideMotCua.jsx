import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import mcTimeLine01 from "../../../../assets/Images/MC_TimeLine01.png";
import mcTimeLine02 from "../../../../assets/Images/MC_TimeLine02.png";
function SlideMotCua() {
	return (
		<div className="px-4 my-10 rounded-lg">
			<Swiper
				pagination={{
					type: "fraction",
					dynamicBullets: true,
				}}
				navigation={true}
				modules={[Pagination, Navigation]}
				className="rounded-lg shadow-md"
			>
				<SwiperSlide>
					<img src={mcTimeLine01} className="w-full rounded-lg" />
				</SwiperSlide>
				<SwiperSlide>
					<img src={mcTimeLine02} className="w-full rounded-lg" />
				</SwiperSlide>
			</Swiper>
		</div>
	);
}

export default SlideMotCua;
