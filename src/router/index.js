import Vue from 'vue';
import VueRouter from 'vue-router';
import {routers, appRouter} from './router';

Vue.use(VueRouter);

// 路由配置
const RouterConfig = {
  mode: 'history',
  fallback: false,
  scrollBehavior: () => ({y: 0}),
  routes: routers
};

export const router = new VueRouter(RouterConfig);
