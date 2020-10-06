import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './main'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount();
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const { asyncData } = this.$options

    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
});

const { app, router, store } = createApp();

// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  // actually mount to DOM
  app.$mount('#app')
})

// service worker
function isLocalhost() {
  return /^http(s)?:\/\/localhost/.test(location.href);
}
if (('https:' === location.protocol || isLocalhost()) && navigator.serviceWorker) {
  navigator.serviceWorker.register('/static/service-worker.js')
}
