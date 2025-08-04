import './styles/main.scss';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';

// Import Swiper
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import './components/alp-main-store';
import './components/alp-cart';
import './components/alp-build-box';

window.Alpine = Alpine;
window.Swiper = Swiper;
Swiper.use([Navigation, Pagination]);

Alpine.plugin(persist);
Alpine.start();

import { counter } from './components/counter';
import { variantSelect } from './components/variant-select';
import { headerSticky } from './components/header';

headerSticky();
variantSelect();
