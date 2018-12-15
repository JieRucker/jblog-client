import $api from '@/api/server';
import {appRouter} from '../../router/router';
import * as types from '../mutation-types';

let marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: false,
  smartLists: true,
  smartypants: true
});

// state
const state = {
  routers: [
    ...appRouter
  ],
  showSearch: false, /*搜索*/
  isLoading: false, /*加载显示*/
  showHeader: true, /*显示头部*/
  showFooter: true, /*显示底部*/
  displayBrand: true,
  navigation_list: [],
  person_info: {
    avatar: '', /*头像*/
    cover: '', /*封面*/
    description: '', /*描述*/
    github: '',
    twitter: '',
    juejin: '',
  },
  about: {
    picture: '',
    description: ''
  }
};

// getters
const getters = {
  get_navigation_list: state => state.navigation_list,
  get_person_info: state => state.person_info,
  get_about: state => state.about
};

// actions
const actions = {
  async getSetting({commit}, payload) {
    let res = await $api.settingInterface.getSetting();
    let {code, data = {}} = res.data;
    if (code === 200) {
      commit({
        type: types.SET_SETTING,
        data
      })
    }
  }
};

// mutations
const mutations = {
  [types.SET_HANDLE_SEARCH](state, isShow) {
    state.showSearch = isShow;
  },
  [types.SET_DISPLAY_BRAND](state, flag) {
    state.displayBrand = flag
  },
  [types.SET_HEADER_VISIBLE](state, flag) {
    state.showHeader = flag;
  },
  [types.SET_FOOTER_VISIBLE](state, flag) {
    state.showFooter = flag;
  },
  [types.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading
  },
  [types.SET_NAVIGATION_LIST](state, payload) {
    state.navigation_list = payload
  },
  [types.SET_SETTING](state, payload) {
    let person_info = payload.data.person_info;
    let about = payload.data.about;
    if (payload) state.person_info = person_info;
    if (about) {
      state.about.picture = about.picture;
      state.about.description = marked(about.description)
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
