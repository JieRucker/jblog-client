import Main from '../views/Main.vue';

export const homeRouter = [{
  path: '/home',
  name: 'home',
  title: '首页',
  component: resolve => require(['../views/home/index'], resolve)
}];

export const archivesRouter = [{
  path: '/archives',
  name: 'archives',
  title: '归档',
  component: resolve => require(['../views/archives/index'], resolve)
}];

export const tagsRouter = [{
  path: '/tags',
  name: 'tags',
  title: '标签',
  component: resolve => require(['../views/tags/index'], resolve)
}];

export const aboutRouter = [{
  path: '/about',
  name: 'about',
  title: '关于',
  component: resolve => require(['../views/about/index'], resolve)
}];

export const articleRouter = [{
  path: '/detail/:id',
  name: 'detail',
  title: '文章',
  component: resolve => require(['../views/article/detail'], resolve)
}];

export const articlesDetailRouter = [{
  path: '/articles/:id',
  name: 'articles',
  title: '文章详情',
  component: resolve => require(['../views/article/articles'], resolve)
}];

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = {
  path: '/',
  redirect: '/home',
  component: Main,
  children: [
    ...homeRouter,
    ...archivesRouter,
    ...tagsRouter,
    ...aboutRouter,
    ...articleRouter,
    ...articlesDetailRouter
  ]
};

export const routers = [
  appRouter
];
