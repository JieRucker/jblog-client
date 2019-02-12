/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/12/23 下午2:50
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/12/23 下午2:50
 */

import * as types from '../mutation-types'

const state = {
  loading: false,
};

const getters = {
  loading: state => state.loading
};

const actions = {
  showLoading({commit, state}) {
    console.log('show_loading')
    commit({
      type: types.SHOW_LOADING,
      status: true
    })
  },
  hideLoading({commit, state}) {
    console.log('hide_loading')
    commit({
      type: types.HIDE_LOADING,
      status: false
    })
  }
};

const mutations = {
  [types.SHOW_LOADING](state, payload) {
    state.loading = payload.status
  },
  [types.HIDE_LOADING](state, payload) {
    state.loading = payload.status
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}

