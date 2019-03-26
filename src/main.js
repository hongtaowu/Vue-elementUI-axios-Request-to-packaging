import 'babel-polyfill';
import Vue from 'vue';
import Http from './utils/https';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/icon/iconfont.css';
import '@/assets/style/base.css';
import i18n from './i18n/i18n';
import App from './App';
import router from './router/index';
import store from './store';
import Commom from './assets/js/common';

Vue.use(ElementUI);

Vue.prototype.$https = Http;
Vue.prototype.utils = Commom;


Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: {
        App
    },
    template: '<App/>',
});