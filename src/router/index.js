import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const RouteList = [{
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "Home" */ '../component/Home.vue')
  }, {
    path: '/blog',
    name: 'blog',
    component: () => import( /* webpackChunkName: "Blog" */ '../component/Blog.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( /* webpackChunkName: "Login" */ '../component/Login.vue'),
  },
  {
    path: '/admin',
    // name: 'admin',
    component: () => import( /* webpackChunkName: "Admin" */ '../component/Admin/Index.vue'),
    children: [{
        path: '',
        component: import('../component/Admin/Write.vue')
      },
      {
        path: 'write',
        // name: 'write',
        component: () => import( /* webpackChunkName: "Write" */ '../component/Admin/Write.vue'),
      },
      {
        path: 'article',
        // name: 'article',
        component: () => import( /* webpackChunkName: "Article" */ '../component/Admin/Article.vue'),
      },
      {
        path: 'menu',
        // name: 'article',
        component: () => import( /* webpackChunkName: "Menu" */ '../component/Admin/Menu.vue'),
      }
    ]
  },
  {
    path: '*',
    redirect: '/admin'
  }
]

export default new Router({
  // base: __dirname,
  mode: 'history',
  routes: RouteList
});