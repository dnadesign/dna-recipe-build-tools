import 'modernizr';
import '../scss/index.scss';

import { polyfill as polyfillPromise } from 'es6-promise';

// Load polyfills on IE11
if (!!window.MSInputMethodContext && !!document.documentMode) {
  polyfillPromise();
  // eslint-disable-next-line no-unused-expressions
  import(/* webpackChunkName: "polyfills" */ './polyfills').then(() => {
    import(/* webpackChunkName: "components" */ './components').then(
      ({ default: loadComponents }) => {
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', loadComponents);
        } else {
          loadComponents();
        }
      }
    );
  });

  document.documentElement.classList.add(['ie11']);
} else {
  // Otherwise load components when the DOM is ready
  import(/* webpackChunkName: "components" */ './components').then(
    ({ default: loadComponents }) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
      } else {
        loadComponents();
      }
    }
  );
}
