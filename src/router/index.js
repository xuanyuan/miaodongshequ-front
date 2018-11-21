import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const RouteList = [{
  path: '/home',
  component: require('../component/Home.vue').default
  // children: [{
  //   path: '',
  //   component: require('../component/Recommend.vue').default
  // }, {
  //   path: 'recommend',
  //   component: require('../component/Recommend.vue').default
  // }, {
  //   path: 'discuss',
  //   component: require('../component/Discuss.vue').default
  // }, {
  //   path: 'about',
  //   component: require('../component/About.vue').default
  // }]
}, {
    path: '/blog',
    component: require('../component/Blog.vue').default
}, {
  path: '*',
  redirect: '/home'
}]

export default new Router({
  mode: 'history',
  routes: RouteList
});