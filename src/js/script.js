import '/src/sass/style.scss';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.gallery-swiper', {
    modules: [Navigation, Pagination],
    loop: true,

    slidesPerView: 1,
    spaceBetween: 20,

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1920: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
    },

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

swiper.on('slideChange', () => {
    console.log('slide changed');
});


const menu = document.querySelector('.menu');

document.querySelector('.burger').addEventListener('click', () => {
    menu.classList.add('menu--active');
});

document.querySelector('.menu-close').addEventListener('click', () => {
    menu.classList.remove('menu--active');
});
