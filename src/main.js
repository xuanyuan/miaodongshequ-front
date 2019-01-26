import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import 'normalize.css';
import './styles/index.scss';

import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'; //引入中文包，提示信息可以以中文形式显示
import {
  Validator
} from 'vee-validate';

Validator.localize('zh_CN', zh_CN); // 设置提示信息中文方式显示

const config = {
  errorBagName: 'errorBags', // change if property conflicts.
  fieldsBagName: 'fieldBags',
  delay: 100,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: true,
  events: 'blur',
  inject: true
};
Vue.use(VeeValidate, config); //一般插件都要use一下


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import './permission';

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})