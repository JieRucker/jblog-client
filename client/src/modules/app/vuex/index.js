/**
 * @Author: jrucker
 * @Description
 * @Date: 2018/02/20 下午1:24
 * @Last Modified by: jrucker
 * @Last Modified time: 2018/02/20 下午1:24
 */

import Vue from 'vue';
import Vuex from 'vuex';

import base from './base';
import app from './app';
import home from './home';
import archives from './archives';
import tags from './tags';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    base,
    app,
    home,
    archives,
    tags,
  }
});

export default store;

