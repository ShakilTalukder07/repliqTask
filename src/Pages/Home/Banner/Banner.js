import React from 'react';
import './Banner.css'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
    return (
        <div className="hero mb-6 background ">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='w-2/3'>
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]}
                        slidesPerView={1}
                        spaceBetween={30}
                        autoplay={{
                            delay: 1500
                        }}
                        navigation
                        pagination={{
                            clickable: true,
                        }}
                        className="mySwiper max-w-screen-xl  mx-auto "
                    >
                        <SwiperSlide><img src="https://i.ibb.co/BT2797M/daniel-salcius-RRc-Ycd-GY630-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/q0RRZMj/xiong-yan-hs8ckhd-PBkk-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/XFZTCDd/nikhil-uttam-Qr-Odhs-MAQw8-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/8zjwdPn/saif71-com-Tf-Bo-Pu-Nw-W2w-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/WkS0YH0/valerie-elash-gs-Kd-Pc-Iye-Gg-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/xDKhFf1/howard-bouchevereau-BRDO4-C-0h-s-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>
                        <SwiperSlide><img src="https://i.ibb.co/tKjsTZn/harpal-singh-Kuv-EVL7l-XYQ-unsplash.jpg" alt='' className=' h-[530px] w-full' /></SwiperSlide>

                    </Swiper>

                </div>
                <div className='w-1/3 ml-2'>
                    <h1 className="text-4xl font-bold text-white">Welcome to Bangladesh’s largest <br /> E-Market.</h1>
                    <div className="py-6 text-white">
                        <p>We sale various types of products. Best in look also affordable in price. You may get your desire car with an affordable price</p>
                    </div>
                    <div className='flex my-10 gap-4'>
                        <Link to='' className="btn btn-ghost bg-green-300 m-2">Let's Buy</Link>
                        <Link to='' className="btn btn-ghost bg-blue-400 m-2">Let's Buy</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;