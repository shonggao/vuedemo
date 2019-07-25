import Vue from 'vue';

//手动导入安装VueRouter
import VueRouter from 'vue-router';
Vue.use(VueRouter)


//导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//按需导入mint-ui中的组件
import {Header,Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//导入vue-resource
import VueResource from 'vue-resource'; 
//安装vue-resource
Vue.use(VueResource);


//导入APP根组件
import app from './APP.vue';

//导入自己的router.js路由模块
import router from './router.js';


var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})