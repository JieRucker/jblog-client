<style lang="scss" scoped>
  .main-inner {
    .posts-archives {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;

      &:after {
        content: " ";
        position: absolute;
        top: 47px;
        margin-left: -2px;
        width: 4px;
        height: 100%;
        background: #f5f5f5;
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      .posts-archives {
        width: 100%;
        min-height: auto;
        padding: 25px;
        &:after {
          top: 33px
        }
      }
    }
    .sidebar {
      display: none;
    }
  }
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-archives animated fadeIn">
      <archives-panel :archives-list="get_archives_list" :total="get_total" @on-click="onArticle"></archives-panel>
      <j-scroll :show-loading="show_spinner" :more="more" @on-click="onClick"></j-scroll>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  // import {createNamespacedHelpers} from 'vuex'
  // const {mapState, mapGetters, mapActions, mapMutations} = createNamespacedHelpers('archives');
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
  import jAside from '@/components/j-aside/j-aside';
  import archivesPanel from '@/components/j-archives/archives-panel';
  import jScroll from '@/components/j-scroll';

  export default {
    name: "index",
    components: {
      jAside,
      archivesPanel,
      jScroll
    },
    computed: {
      ...mapState({
        more: state => state.archives.more,
        show_spinner: state => state.archives.show_spinner
      }),
      ...mapGetters({get_archives_list: 'archives/get_archives_list', get_total: 'archives/get_total'})
    },
    data() {
      return {
        _loadMore: null,
      }
    },
    asyncData({store, route}) {
      store.commit('archives/SET_RESET');
      return store.dispatch('archives/getArchivesList', {
        keyword: route.query.keyword ? route.query.keyword : ''
      })
    },
    created() {

    },
    watch: {
      '$route'(to) {
      }
    },
    mounted() {
      this._loadMore = this.$Global.debounce(this.loadMore, 300);
      window.addEventListener('scroll', this._loadMore, false)
    },
    methods: {
      ...mapMutations({
        setReset: 'archives/SET_RESET',
        showSpinner: 'archives/SHOW_SPINNER'
      }),
      ...mapActions({getArchivesList: 'archives/getArchivesList'}),
      onClick() {
        this.showSpinner(true);
        this.getArchivesList({
          keyword: this.$route.query.keyword ? this.$route.query.keyword : ''
        })
      },
      loadMore() {
        let html = document.querySelector('html');
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (html.scrollHeight - scrollTop - 204 <= window.innerHeight) {
          if (this.more) {
            this.showSpinner(true);
            this.getArchivesList({
              keyword: this.$route.query.keyword ? this.$route.query.keyword : ''
            })
          }
        }
      },
      onArticle(item) {
        this.$router.push({
          name: 'detail',
          params: {
            id: item.id
          }
        })
      }
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this._loadMore)
    }
  }
</script>
