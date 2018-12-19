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
      <archives-panel :archives-list="archives_list" :total="args.total" @on-click="onClick"></archives-panel>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';
  import archivesPanel from '@/components/j-archives/archives-panel';

  export default {
    name: "index",
    components: {
      jAside,
      archivesPanel
    },
    data() {
      return {
        archives_list: [],
        args: {
          current_page: 1,
          page_size: 10,
          total: 0
        }
      }
    },
    mounted() {
      this.getArchivesList()
    },
    methods: {
      async getArchivesList() {
        this.archives_list.splice(0, this.archives_list.length);
        let res = await this.$api.archivesInterface.getArchivesList({...this.args});
        let {code, data} = res.data;
        if (code === 200) {
          this.args.total = data.total;

          data.list.forEach(item => {
            let result = () => {
              let a = [];
              item.list.forEach(article => {
                let date = `${this.$Global.formatDate(article.article_create_time).month}-${this.$Global.formatDate(article.article_create_time).day}`;
                a.push({
                  date: date,
                  title: article.article_title,
                  id: article._id
                })
              });

              return a;
            };

            let list = result();

            this.archives_list.push({
              name: item.year,
              list: list
            })
          })
        }
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
