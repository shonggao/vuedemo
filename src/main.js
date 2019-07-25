import Vue from 'vue';

//导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//按需导入mint-ui中的组件
import {Header} from 'mint-ui';
Vue.component(Header.name,Header)

//导入APP根组件
import app from './APP.vue';



var vm = new Vue({
    el: '#app',
    render: c => c(app)
})