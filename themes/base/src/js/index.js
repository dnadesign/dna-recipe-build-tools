import 'focus-visible';

import smoothscroll from 'smoothscroll-polyfill';

import { loadComponents } from './components';

document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    loadComponents();
  }
});

smoothscroll.polyfill();
