// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRx from 'vue-rx';
import App from './App';
import router from './router';


// Use the VueRx plugin with the entire RxJS library
Vue.use(VueRx);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
