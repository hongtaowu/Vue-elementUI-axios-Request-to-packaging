import Vue from 'vue'
import Router from 'vue-router'
import routers  from './router';
import Cookies from 'js-cookie'

Vue.use(Router);

 const router = new Router({
  mode: 'history',
  routes: routers
})

router.beforeEach((to, from, next) => {
    if(to.path === '/login'){
        return next();
    }
    const token = Cookies.get('authToken');
    if(token){
        return next();
    }
    return next('/login');
   
});

router.afterEach((to) => {
  
  window.scrollTo(0, 0);
});


export default router