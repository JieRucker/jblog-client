<style lang="scss" scoped>
  .main {
    padding-bottom: 260px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 1110px;
  }

  @media (max-width: 991px) {
    .main {
      width: 100%;
    }
  }
</style>

<template>
  <main id="main" class="main">
    <router-view></router-view>
  </main>
</template>

<script>
  export default {
    name: "j-main",
  }
</script>
