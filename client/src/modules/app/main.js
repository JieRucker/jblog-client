// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import {router} from './router';
import store from './vuex';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import wyboot from '@/libs/wyboot';
import api from '@/api/server';
import jDynamic from '@/components/j-dynamic';
import LoadingScroll from '@/directive/loading-scroll';

const API = {
  VueI18n,
  iView,
  LoadingScroll
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Vue.use(opts.VueI18n);
  Vue.use(opts.iView);
  Vue.directive('loading-scroll', opts.LoadingScroll);

  Vue.prototype.$api = api;
  Vue.prototype.$Global = wyboot;
  Vue.prototype.$jDynamic = jDynamic;
};

install(Vue, API);

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});

/*Vue.directive('scrollShow', {
  bind: el => {
    window.addEventListener('scroll', () => {
      let actualTop = el.offsetTop,
        current = el.offsetParent;
      while (current != null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
      }
      if (actualTop - document.body.scrollTop < 300) {
        el.classList.add("show");
      }
    });
  }
});

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});*/
