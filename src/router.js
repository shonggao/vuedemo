
import VueRouter from 'vue-router';

//导入tabbar组件
import homeContainer from './component/tabbar/HomeContainer.vue';
import memberContainer from './component/tabbar/MemberContainer.vue';
import shopcarContainer from './component/tabbar/ShopcarContainer.vue';
import searchContainer from './component/tabbar/SearchContainer.vue';


//导入newslist组件
import newsList from './component/news/NewsList.vue';

//导入newsinfo组件
import newsInfo from './component/news/NewsInfo.vue';

//导入photoList组件
import photoList from './component/photos/PhotoList.vue';

//导入photoInfo组件
import photoInfo from './component/photos/PhotoInfo.vue';

//导入goodsList组件
import goodsList from './component/goods/GoodsList.vue';

//导入goodsInfo组件
import goodsInfo from './component/goods/GoodsInfo.vue';

//导入图文介绍和商品评论组件
import goodsDesc from './component/goods/GoodsDesc.vue';
import goodsComment from './component/goods/GoodsComment.vue';

//创建路由对象
var router = new VueRouter({
    routes: [     // 配置路由规则的
       { path: '/' , redirect: '/home'},
       { path: '/home' , component: homeContainer},
       { path: '/member' , component: memberContainer},
       { path: '/shopcar' , component: shopcarContainer},
       { path: '/search' , component: searchContainer},
       { path: '/home/newslist' , component: newsList},
       { path: '/home/newsinfo/:id' , component: newsInfo},
       { path: '/home/photolist' , component: photoList},  
       { path: '/home/photoinfo/:id' , component: photoInfo},              
       { path: '/home/goodslist' , component: goodsList},              
       { path: '/home/goodsinfo/:id' , component: goodsInfo , name: 'goodsinfo'},                            
       { path: '/home/goodsdesc/:id' , component: goodsDesc , name: 'goodsdesc'},                            
       { path: '/home/goodscomment/:id' , component: goodsComment , name: 'goodscomment'},                                          
    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

export default router