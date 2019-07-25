
import VueRouter from 'vue-router';

//导入tabbar组件
import homeContainer from './component/tabbar/HomeContainer.vue';
import memberContainer from './component/tabbar/MemberContainer.vue';
import shopcarContainer from './component/tabbar/ShopcarContainer.vue';
import searchContainer from './component/tabbar/SearchContainer.vue';


//创建路由对象
var router = new VueRouter({
    routes: [     // 配置路由规则的
       { path: '/' , redirect: '/home'},
       { path: '/home' , component: homeContainer},
       { path: '/member' , component: memberContainer},
       { path: '/shopcar' , component: shopcarContainer},
       { path: '/search' , component: searchContainer}       
       
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

export default router