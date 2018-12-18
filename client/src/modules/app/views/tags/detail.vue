<style lang="scss" scoped>
  .main-inner {
    .tags-detail {
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
      .tags-detail {
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
    <section class="tags-detail animated fadeIn">
      <archives-panel :archives-list="archivesList" :total="total" @on-click="onClick"></archives-panel>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';
  import archivesPanel from '@/components/j-archives/archives-panel';

  export default {
    name: "detail",
    components: {
      jAside,
      archivesPanel
    },
    data() {
      return {
        total: 10,
        archivesList: [
          {
            name: 'javascript',
            list: [
              {
                date: '10-11',
                title: '分享个人命名方式',
                id: '5bfa573fef3cab3051ce965d'
              },
              {
                date: '10-12',
                title: '分享个人命名方式2',
                id: '5c18f2da5a829f4cef40dd00'
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this.getTagsDetail()
    },
    methods: {
      async getTagsDetail() {
        let res = await this.$api.tagsInterface.getTagsDetail({_id: this.$route.query._id});
        let {data} = res.data;
        console.log('data', data)
      },
      onClick(item) {
        this.$router.push({
          path: 'article-detail',
          query: {
            _id: item.id
          }
        })
      }
    }
  }
</script>
