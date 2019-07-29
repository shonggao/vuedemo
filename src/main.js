import Vue from 'vue';

//手动导入安装VueRouter
import VueRouter from 'vue-router';
Vue.use(VueRouter)


//导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// //按需导入mint-ui中的组件
// import {Header,Swipe, SwipeItem, Button } from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// import { Lazyload } from 'mint-ui';

// Vue.use(Lazyload);

//安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  })

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)


//导入vue-resource
import VueResource from 'vue-resource'; 
//安装vue-resource
Vue.use(VueResource);
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
//全局设置post时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//导入APP根组件
import app from './APP.vue';

//导入格式化时间的插件
import moment from 'moment';

//导入自己的router.js路由模块
import router from './router.js';

//定义全局时间过滤器
Vue.filter('dateFormat',function(dataStr, pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})