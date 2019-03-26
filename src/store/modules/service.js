// import axios from 'axios';
import axios from '@/libs/https';
import util from '@/libs/util';
import {API_URL_PATTERN} from '@/libs/util';

const service = {
  namespaced: true,
  state: {},
  actions: {


    async post(context, payload) {
      let response = await axios.post(API_URL_PATTERN + 'CustomerService/GetList', payload.data);
      return util.wrapResult(response);
    },

    async get(context, payload) {
      let response = await axios.get(API_URL_PATTERN + payload.serviceName, payload.data);

      return util.wrapResult(response);
    },




  }
};

export default service;
