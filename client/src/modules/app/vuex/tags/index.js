/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/23 下午2:34
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/23 下午2:34
 */

import $api from '@/api/server';
import * as types from '../mutation-types';

// state
const state = {
  tags_list: []
};

// getters
const getters = {
  get_tags_list: state => state.tags_list
};

// actions
const actions = {
  async getTagsList({dispatch, commit, state}) {
    // dispatch('showLoading', null, {root: true});

    let res = await $api.tagsInterface.getTagsList();
    let {code, data = {}} = res.data;
    if (code === 200) {
      commit({
        type: types.SET_TAGS_LIST,
        data
      });
    }
    // dispatch('hideLoading', null, {root: true})
  }
};

// mutations
const mutations = {
  [types.SET_TAGS_LIST](state, payload) {
    let data = payload.data;
    let {article_num_list = [], tags_list = []} = data;
    tags_list.forEach(item => {
      let temp = article_num_list.find(i => i._id === item._id);
      item.tags_article_num = temp ? temp.count : 0;
    });

    state.tags_list = tags_list.sort((a, b) => a.tags_article_num < b.tags_article_num);
    state.tags_list = tags_list;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
