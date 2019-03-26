import Vue from 'vue';
import Vuex from 'vuex';

import service from './modules/service';
import customer from './modules/customer';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        service,
        customer,
    }
});

export default store;
