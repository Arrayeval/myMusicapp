// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import './common/stylus/index.styl'

import fastclick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    fastclick.attach(document.body);
  }, false);
}
// fastclick.attach(document.body);



/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // template: '<App/>',
    //components: { App }
  render: h => h(App)
  }
)
