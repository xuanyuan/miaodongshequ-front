import router from './router';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
  Message
} from 'element-ui';
import {
  getToken
} from './utils/auth';

// 不重定向白名单，登陆，订阅首页，订餐页面
const whiteList = ['/login', '/home', '/menu'];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    // token有效，且是登陆页面跳转到首页，其他页面正常访问
    if (to.path === '/login') {
      next({
        path: '/admin'
      });
      NProgress.done()
    } else {
      next();
    }
  } else {
    // token无效，白名单可以访问，其他返回登陆页
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done();
})