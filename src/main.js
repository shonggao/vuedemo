import Vue from 'vue';

//手动导入安装VueRouter
import VueRouter from 'vue-router';
Vue.use(VueRouter)

//每次进入网站，从本地存储中把购物车的数据读取出来.
var car = JSON.parse(localStorage.getItem('car') || '[]')

//注册vuex
import Vuex from 'vuex';
Vue.use(Vuex);
var store = new Vuex.Store({
    state:{   //this.$store.state.***
        car: car,   //将购物车中商品的数据，用一个数组存储起来，在car数组中存储一些商品的对象，暂时将商品的对象设置成
        //{ id：商品id ,count: 要购买的数量 , price:商品的单价 , selected: true | false}
        
    },
    mutations:{    //this.$store.commit('***')
        addToCar( state, goodsInfo){
            //点击加入购物车，把商品信息保存到 store 中的 car 上
            //1. 如果购物车中，之前就有这个对应的商品了，那么只需要更新数量
            //2. 如果没有，则直接把商品数据，push 到 car 中即可


            //假设在购物车中没有找到对应的商品
            var flag = false;
            state.car.some(item => {
                if(item.id == goodsInfo.id){
                    item.count += parseInt( goodsInfo.count );
                    flag = true;
                    return true;
                }
            });

            //如果最终循环完毕，得到的 flag === false ,则把商品数据直接 push 到购物车中
            if(flag === false){
                state.car.push(goodsInfo);
            }


            // 当更新 car 之后， 把 car 数组存储到本地的 localStorages 中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsInfo(state,goodsInfo){
            state.car.some(item => {
                if(item.id === goodsInfo.id){
                    item.count = parseInt(goodsInfo.count);
                    return true;
                }
            });
            // 当更新 car 之后， 把 car 数组存储到本地的 localStorages 中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        removeFromCar(state, id){
            // 根据 id ，从 store 中的购物车中删除对应的商品
            state.car.some((item,i) => {
                if(item.id == id){
                    state.car.splice(i,1);
                    return true;
                }
            })
            // 当更新 car 之后， 把 car 数组存储到本地的 localStorages 中
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        updateGoodsSelected(state,goodsInfo){
            state.car.some(item => {
                if(item.id === goodsInfo.id){
                    item.selected = goodsInfo.selected;
                }
            })
            // 当更新 car 之后， 把 car 数组存储到本地的 localStorages 中
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters:{  //this.$store.getters.***
        getAllCount(state){
            var c = 0;
            state.car.forEach(item =>{
                c +=  item.count;
            }
            );
            return c;
        },
        getGoodsCount(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        },
        getGoodsSelected(state){
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountAndAmount(state){
            var o = {
                count: 0, //勾选的数量
                amount: 0 //勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected == true){
                    o.count += item.count;
                    o.amount += item.price*item.count;
                }
            })
            return o;
        }
    }
});

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
    router,
    store
})