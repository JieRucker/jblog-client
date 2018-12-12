import {appRouter} from '../../router/router';

const app = {
  state: {
    routers: [
      ...appRouter
    ],
    showSearch: false, /*搜索*/
    isLoading: false, /*加载显示*/
    showHeader: true, /*显示头部*/
    showFooter: true, /*显示底部*/
    displayBrand: true,
    navigation_list: []
  },
  getters: {
    get_navigation_list: state => state.navigation_list,
    getShortArticles: (state) => {
      /*const shortArticles = state.articles.map((article) => {
        let newArticle = {...article}
        newArticle.content = newArticle.content.slice(0, 200) + '......';
        return newArticle
      })
      return shortArticles*/
      console.log('state',state)
    },
  },
  mutations: {
    handleSearch(state, isShow) {
      state.showSearch = isShow;
    },
    setDisplayBrand(state, flag) {
      state.displayBrand = flag
    },
    setHeaderVisible(state, flag) {
      state.showHeader = flag;
    },
    setFooterVisible(state, flag) {
      state.showFooter = flag;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading
    },
    setNavigationList(state, value) {
      state.navigation_list = value
    }
  }
};

export default app;
