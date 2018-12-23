/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/23 下午2:34
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/23 下午2:34
 */

import $api from '@/api/server';
import * as types from '../mutation-types';
import $Global from '@/libs/wyboot';

// state
const state = {
  archives_list: [],
  args: {
    current_page: 1,
    page_size: 10,
  },
  total: 0,
  more: true, /*是否正在加载过程中*/
  show_spinner: false
};

// getters
const getters = {
  get_archives_list: state => state.archives_list,
  get_total: state => state.total
};

// actions
const actions = {
  async getArchivesList({dispatch, commit, state}, payload) {
    // dispatch('showLoading', null, {root: true});

    let res = await $api.archivesInterface.getArchivesList({...state.args, keyword: payload.keyword});
    let {code, data = {}} = res.data;
    if (code === 200) {
      commit({
        type: types.SET_ARCHIVES_LIST,
        data
      });
    }
    // dispatch('hideLoading', null, {root: true})
  }
};

// mutations
const mutations = {
  [types.SET_ARCHIVES_LIST](state, payload) {
    let data = payload.data;
    state.show_spinner = false;
    state.total = data.total;

    data.list.forEach(item => {
      let result = () => {
        let a = [];
        item.list.forEach(article => {
          let month = $Global.formatDate(article.article_create_time).month;
          let day = $Global.formatDate(article.article_create_time).day;
          let date = `${month}-${day}`;
          a.push({date: date, title: article.article_title, id: article._id})
        });

        return a;
      };

      let list = result();

      if (state.archives_list.length) {
        let index = state.archives_list.findIndex((value, index) => item.year === value.name);

        if (index >= 0) list.forEach(a => state.archives_list[index].list.push(a));
        else state.archives_list.push({name: item.year, list: list})

        return false
      }

      state.archives_list.push({name: item.year, list: list})
    });

    state.args.current_page = ++state.args.current_page;

    let totalPage = Math.ceil(data.total / state.args.page_size);
    state.more = state.args.current_page <= totalPage;
  },
  [types.SHOW_SPINNER](state, payload) {
    state.show_spinner = payload
  },
  [types.SET_RESET](state, payload) {
    state.archives_list = [];
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
