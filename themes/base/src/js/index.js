import 'modernizr';
import '../scss/index.scss';

import Example, { ExampleSelector } from '../components/Example/Example';

window.addEventListener('DOMContentLoaded', () => {
  // Detect IE11
  if (!!window.MSInputMethodContext && !!document.documentMode) {
    document.documentElement.classList.add(['ie11']);
  }

  if (document.querySelector(ExampleSelector)) {
    Example();
  }
});
