import Vue from 'vue';
import iView from 'iview';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import wyboot from '@/libs/wyboot';
import api from '@/api/server';
import jDynamic from '@/components/j-dynamic';
import store from './vuex';
import {router} from './router';
import {sync} from 'vuex-router-sync';
import titleMixin from './util/title';
import * as filters from './util/filters';

// mixin for handling title
Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

const API = {
  iView
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Vue.use(opts.iView);

  Vue.prototype.$api = api;
  Vue.prototype.$Global = wyboot;
  Vue.prototype.$jDynamic = jDynamic;
};

install(Vue, API);

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp() {
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router);

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return {app, router, store}
}
