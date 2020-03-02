import './Example.scss';

import Vue from 'vue';

export const ExampleSelector = '.example';

const Example = () =>
  new Vue({
    el: ExampleSelector,
    name: 'Example',
    data: {
      exampleTitle: ''
    },
    mounted() {
      this.exampleTitle = this.$el.dataset.exampletitle;
    }
  });

export default Example;
