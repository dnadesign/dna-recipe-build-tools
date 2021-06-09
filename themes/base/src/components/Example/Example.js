import './Example.scss';

import Vue from 'vue';

const componentSelector = '.example';

export const Example = (el) =>
  new Vue({
    el,
    name: 'Example',
    data: {
      exampleTitle: ''
    },
    mounted() {
      this.exampleTitle = this.$el.dataset.exampleTitle;
    }
  });

export default function init(scope = document) {
  scope.querySelectorAll(componentSelector).forEach((el) => Example(el));
}
