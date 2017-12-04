// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
Vue.config.productionTip = false

import './common/stylus/index.styl'

import fastclick from 'fastclick'

import  VueLazyLoad from 'vue-lazyload'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastclick.attach(document.body);
  }, false);
}
// fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')

});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // template: '<App/>',
    //components: { App }
    render: h => h(App)
  }
)
