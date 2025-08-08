// import '../styles/main.scss';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';

// Import Swiper
import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

import '../components/alp-main-store';
import '../components/alp-cart';
import '../components/alp-build-box'; // FE TODO Must be included only for the build box section

window.Alpine = Alpine;
window.Swiper = Swiper;
Swiper.use([Navigation, Pagination]);

Alpine.plugin(persist);
Alpine.start();
