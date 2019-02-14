/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/23 下午2:10
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/23 下午2:10
 */

import $api from '@/api/server';
import * as types from '../mutation-types';
import $Global from '@/libs/wyboot';

// state
const state = {
  search: {
    keyword: '',
    tag: '',
    state: ''
  },
  article_list: [],
  args: {
    current_page: 1,
    page_size: 10,
  },
  more: true, /*是否正在加载过程中*/
  show_spinner: false
};

// getters
const getters = {
  get_article_list: state => state.article_list
};

// actions
const actions = {
  async getArticleList({dispatch, commit, state}) {
    // dispatch('showLoading', null, {root: true});

    let res = await $api.articleInterface.getArticleList({...state.search, ...state.args});
    let {code, data = {}} = res.data;
    if (code === 200) {
      data.list.forEach(item => {
        let year = $Global.formatDate(item.article_create_time.replace(/\-/g, "/")).year;
        let month = $Global.formatDate(item.article_create_time.replace(/\-/g, "/")).month;
        let day = $Global.formatDate(item.article_create_time.replace(/\-/g, "/")).day;

        item.article_create_time = `${year}-${month}-${day}`;
        item.month = `${month}`;
        item.day = `${day}`;
      });

      commit({
        type: types.SET_ARTICLE_LIST,
        data
      });
    }
    // dispatch('hideLoading', null, {root: true})
  }
};

// mutations
const mutations = {
  [types.SET_ARTICLE_LIST](state, payload) {
    let data = payload.data;
    state.show_spinner = false;

    data.list.forEach(item => state.article_list.push(item));
    state.args.current_page = ++state.args.current_page;
    let totalPage = Math.ceil(data.total / state.args.page_size);
    state.more = state.args.current_page <= totalPage;
  },
  [types.SHOW_SPINNER](state, payload) {
    state.show_spinner = payload
  },
  [types.SET_RESET](state, payload) {
    state.article_list = [];
    state.args.current_page = 1
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
