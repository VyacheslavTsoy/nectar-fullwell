// import '../styles/main.scss';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';

// Import Swiper
import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

import '../components/mini-cart';

window.Alpine = Alpine;
window.Swiper = Swiper;
Swiper.use([Navigation, Pagination]);

Alpine.plugin(persist);
Alpine.start();
