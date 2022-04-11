const selector = '.theme-switcher';

/**
 * Toggle themes in the styleguide
 */
export function ThemeSwitcher() {
  document.querySelectorAll(`${selector} input`).forEach((el) => {
    el.addEventListener('change', (ev) => {
      const newClassname = document.body.className.replace(
        /theme--\S+/,
        `theme--${ev.target.value}`
      );
      document.body.className = newClassname;
    });
  });
}

export default function init() {
  if (document.querySelector(selector)) ThemeSwitcher();
}
