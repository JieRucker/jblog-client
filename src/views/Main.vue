<style lang="scss" scoped>
  @media (max-width: 991px) {
    .main-inner .sidebar {
      display: none !important;
    }
  }
</style>

<template>
  <div class="main-container">
    <j-header></j-header>
    <j-main></j-main>
    <j-footer></j-footer>
    <j-back-top></j-back-top>
    <j-search></j-search>
    <j-other></j-other>
    <j-loading></j-loading>
  </div>
</template>
<script>
  // import {mapActions} from 'vuex';
  // import CanvasNest from 'canvas-nest.js';
  import '@/assets/styles/common.scss';
  import '@/assets/styles/animate.css';
  import jHeader from '@/components/j-header/j-header';
  import jMain from '@/components/j-main/j-main';
  import jFooter from '@/components/j-footer/j-footer';
  import jSearch from '@/components/j-search/j-search';
  import jOther from '@/components/j-other/j-other';
  import jLoading from '@/components/j-loading/j-loading';
  import jBackTop from '@/components/j-back-top/j-back-top';

  export default {
    components: {
      jHeader,
      jMain,
      jFooter,
      jSearch,
      jOther,
      jLoading,
      jBackTop
    },
    data: () => ({
      CONFIG: {
        favicon: {
          hidden: "https://www.jrucker.cn/static/images/logo/J-48.jpg",
          hide_text: "阿杰日记！",
          narmal: "https://www.jrucker.cn/static/images/logo/J-48.jpg",
          show_text: "阿杰日记！"
        }
      },
    }),
    title() {
    },
    asyncData({store, route}) {
      return store.dispatch('app/getSetting')
    },
    mounted() {
      this.watchVisibleChange();
      // if (process.env.NODE_ENV === 'production') this.canvasNest()
    },
    methods: {
      // ...mapActions({getSetting: 'app/getSetting'}),
      /*canvasNest() {
        const config = {
          color: '0,0,255',
          count: 80,
          opacity: '0.7',
          zIndex: '-2'
        };

        let app = document.querySelector('#app');
        const canvasNest = new CanvasNest(app, config);
      },*/
      /*监控title变化*/
      watchVisibleChange() {
        let OriginTitile = document.title;
        let titleTime;
        document.addEventListener('visibilitychange', () => {
          if (document.hidden) {
            document.querySelector('[rel="icon"]').setAttribute('href', this.CONFIG.favicon.hidden);
            document.title = this.CONFIG.favicon.hide_text;
            clearTimeout(titleTime);
          }
          else {
            document.querySelector('[rel="icon"]').setAttribute('href', this.CONFIG.favicon.narmal);
            document.title = this.CONFIG.favicon.show_text + OriginTitile;
            titleTime = setTimeout(function () {
              document.title = OriginTitile;
            }, 2000);
          }
        });
      }
    }
  };
</script>
