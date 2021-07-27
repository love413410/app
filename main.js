import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import urls from './assets/lib/urls.js';
import http from './assets/lib/http.js';
Vue.prototype.urls = urls;
Vue.prototype.http = http;

const app = new Vue({
	...App
})
app.$mount()
