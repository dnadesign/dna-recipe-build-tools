import './Example.scss';

import Vue from 'vue';

const componentSelector = '.example';

export const Example = () =>
  new Vue({
    el: componentSelector,
    name: 'Example',
    data: {
      exampleTitle: ''
    },
    mounted() {
      this.exampleTitle = this.$el.dataset.exampleTitle;
    }
  });

export default function init() {
  if (document.querySelector(componentSelector)) Example();
}
