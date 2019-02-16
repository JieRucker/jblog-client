<style lang="scss">
  body, html {
    height: 100%;
  }

  body {
    background: #efefef !important;
    cursor: url(https://www.jrucker.cn/static/images/icon/cursor.ico), auto;
  }

  .app-main {
    position: relative;
    min-height: 100%;
  }
</style>

<template>
  <div id="app" class="app-main">
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'app',
    data() {
      return {}
    }
  }
</script>

