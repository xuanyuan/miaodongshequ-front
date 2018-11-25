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
}, {
  path: '*',
  redirect: '/home'
}]

export default new Router({
  // base: __dirname,
  mode: 'history',
  routes: RouteList
});