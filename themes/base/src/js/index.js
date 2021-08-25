import 'focus-visible';
import '../scss/index.scss';

import smoothscroll from 'smoothscroll-polyfill';

import { loadComponents } from './components';

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    loadComponents();
  }
});

smoothscroll.polyfill();
