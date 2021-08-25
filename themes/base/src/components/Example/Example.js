import './Example.scss';

import { createApp } from 'vue';

const componentSelector = '.example';

export const Example = (el) =>
  createApp({
    name: 'Example',
    data() {
      return {
        exampleTitle: ''
      };
    },
    mounted() {
      this.exampleTitle = el.dataset.exampleTitle;
    }
  }).mount(el);

export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => Example(el));
}
