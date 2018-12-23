<style lang="scss" scoped>
  .loading-layer {
    width: 100%;
    height: 60px;
    text-align: center;
    font-size: 16px;
    line-height: 60px;
    color: #AAA;
    position: relative;
    .spinner-holder {
      transition: opacity .15s linear;
      -webkit-transition: opacity .15s linear;
      -webkit-font-smoothing: antialiased;
      .more {
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class="loading-layer">
      <span class="spinner-holder">
          <spinner v-if="showLoading"></spinner>
          <span class="more" v-if="!showLoading && more" @click="onClick">下拉加载更多...</span>
          <span v-if="!more" :style="{color: loadingLayerColor}" v-text="noDataText"></span>
      </span>
  </div>
</template>

<script>
  import spinner from './spinner';

  export default {
    name: "index",
    components: {
      spinner
    },
    props: {
      showLoading: {
        type: Boolean,
        default: false
      },
      more: {
        type: Boolean,
        default: true
      },
      loadingLayerColor: {
        type: String,
        default: '#aaa'
      },
      noDataText: {
        type: String,
        default: '没有更多数据了...'
      },
    },
    methods: {
      onClick() {
        this.$emit('on-click')
      }
    }
  }
</script>


