<template>
    <div>
        <!-- 轮播图区域 -->
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

        <!-- 六宫格的改造工程 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
                        <img src="../../img/menu1.png" alt="">
                        <div class="mui-media-body">新闻资讯</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                        <img src="../../img/menu2.png" alt="">                      
                        <div class="mui-media-body">图片分享</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
                        <img src="../../img/menu3.png" alt="">
                        <div class="mui-media-body">商品购买</div></router-link></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <img src="../../img/menu4.png" alt="">                        
                        <div class="mui-media-body">留言反馈</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <img src="../../img/menu5.png" alt="">                        
                        <div class="mui-media-body">视频专区</div></a></li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                        <img src="../../img/menu6.png" alt="">
                        <div class="mui-media-body">联系我们</div></a></li>
            </ul> 
    </div>
</template>

<script>
    //导入Toast提示消息
    import { Toast } from 'mint-ui';
    //导入轮播图组件
    import swiper from '../subcomponent/Lunbotu.vue';

    export default {
        data() {
            return {
                lunbotuList: [] //保存轮播图的数组
            };
        },
        created() {
            this.getLunbotu();
        },
        methods: {
            getLunbotu(){  //获取轮播图数据的方法
                this.$http.get('api/getlunbo').then(result => {
                    if(result.body.status === 0){
                        this.lunbotuList = result.body.message;
                    }
                    else{
                        Toast("加载轮播图失败。。。");
                    }
                })
            }
        },
        components: {
            swiper
        }
    }
</script>
<style lang="scss" scoped>

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 60px;
        height: 60px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
}
.mui-media-body {
    font-size: 13px;
}
</style>