<style lang="scss" scoped>
  .main-inner {
    .posts-about {
      float: left;
      width: 772px;
      min-height: 700px;
      box-shadow: initial;
      border-radius: initial;
      background: #fff;
      padding: 40px;
      position: relative;
      overflow: hidden;
      .header {
        text-align: center;
        color: #333;
        font-size: 20px;
        font-weight: 700;
      }
      .body {
        margin-top: 20px;
        .info {
          text-align: center;
          margin-bottom: 10px;
          img {
            max-width: 100%;
          }
        }
        .description {
          font-size: 14px;
        }
      }
    }
  }

  @media (max-width: 991px) {
    .main-inner {
      .posts-about {
        width: 100%;
        min-height: auto;
        padding: 15px;
      }
    }
    .sidebar {
      display: none;
    }
  }
</style>

<style lang="scss">
  .main-inner {
    .posts-about {
      .body {
        .description {
          p {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="main-inner clearfix">
    <section class="posts-about animated fadeIn">
      <div class="header">关于</div>
      <div class="body">
        <div class="info">
          <img :src="get_about.picture">
        </div>
        <div class="description" v-html="get_about.description"></div>
      </div>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import jAside from '@/components/j-aside/j-aside';

  export default {
    name: "index",
    components: {
      jAside
    },
    computed: {
      ...mapGetters({
          get_about: 'app/get_about'
      })
    }
  }
</script>

