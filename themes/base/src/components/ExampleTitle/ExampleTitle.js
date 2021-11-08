import './ExampleTitle.scss';

import { createApp } from 'vue';

const componentSelector = '.example-title';

export const ExampleTitle = (el) =>
  createApp({
    name: 'ExampleTitle',
    data() {
      return {
        exampleTitle: '',
      };
    },
    mounted() {
      this.exampleTitle = el.dataset.exampleTitle;
    },
  }).mount(el);

export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => ExampleTitle(el));
}
