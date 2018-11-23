import Vue from 'vue';
import Router from 'vue-router';
import Home from '../component/Home.vue';
import Blog from '../component/Blog.vue';

Vue.use(Router);

const RouteList = [{
  path: '/home',
  name: 'home',
  component: Home
}, {
  path: '/blog',
  name: 'blog',
  component: Blog
}, {
  path: '*',
  redirect: '/home'
}]

export default new Router({
  // base: __dirname,
  mode: 'history',
  routes: RouteList
});