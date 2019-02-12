<style lang="scss" scoped>
  .main-inner {
    .articles {
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
      .articles {
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
    <section class="articles animated fadeIn">
      <archives-panel :archives-list="articles_list" :total="args.total" @on-click="onArticle"></archives-panel>
      <j-scroll :show-loading="show_spinner" :more="more" @on-click="onClick"></j-scroll>
    </section>
    <j-aside :show-tabs="false"></j-aside>
  </div>
</template>

<script>
  import jAside from '@/components/j-aside/j-aside';
  import archivesPanel from '@/components/j-archives/archives-panel';
  import jScroll from '@/components/j-scroll';

  export default {
    name: "articles",
    components: {
      jAside,
      archivesPanel,
      jScroll
    },
    data() {
      return {
        _loadMore: null,
        articles_list: [],
        args: {
          current_page: 1,
          page_size: 10,
          total: 0
        },
        more: true, /*是否正在加载过程中*/
        show_spinner: false
      }
    },
    mounted() {
      this.getTagsDetail();

      this._loadMore = this.$Global.debounce(this.loadMore, 300);
      window.addEventListener('scroll', this._loadMore, false)
    },
    methods: {
      onClick() {
        this.show_spinner = true;
        this.getTagsDetail()
      },
      async getTagsDetail() {
        let res = await this.$api.tagsInterface.getTagsDetail({_id: this.$route.params.id, ...this.args});
        let {code, data} = res.data;
        if (code === 200) {
          this.show_spinner = false;
          this.args.total = data.total;

          let result = () => {
            let a = [];
            data.list.forEach(article => {
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

          if (this.articles_list.length) {
            let index = this.articles_list.findIndex((value, index) => data.tags_name === value.name);

            if (index >= 0) {
              list.forEach(a => this.articles_list[index].list.push(a));
            }
          } else {
            this.articles_list.push({
              name: data.tags_name,
              list: list
            })
          }

          this.args.current_page = ++this.args.current_page;

          let totalPage = Math.ceil(data.total / this.args.page_size);
          this.more = this.args.current_page <= totalPage;
        }
      },
      loadMore() {
        let html = document.querySelector('html');
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        if (html.scrollHeight - scrollTop - 204 <= window.innerHeight) {
          if (this.more) {
            this.show_spinner = true;
            this.getTagsDetail()
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
