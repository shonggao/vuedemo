<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @click="getPhotoListByCateID(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片列表区域 -->
        <div>
            <ul class="photo-list">
                <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li"> 
                    <img v-lazy="item.img_url">
                    <div class="info">
                        <h1 class="info-title">{{ item.title }}</h1>
                        <div class="info-body">{{ item.zhaiyao }}</div>
                    </div>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
//导入mui.js
import mui from '../../lib/mui/js/mui.min.js';

export default {
    data() {
        return {
            cates: [], //所有分类的列表数组
            list: [], //图片列表数组
        }
    },
    created() {
        this.getAllCategory();

        //默认进入页面就请求所有图片列表数据
        this.getPhotoListByCateID(0);
    },
    mounted() {  
        //当组件中的 DOM 结构被渲染好并放在页面中后，会执行这个钩子函数
        //如果要操作 DOM 元素，最好在 mounted 里面，因为这里时候的 DOM 元素是最新的
        //初始化滑动控件
        mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getAllCategory(){
            //获取所有的图片分类
            this.$http.get("api/getimgcategory").then(result => {
                if( result.body.status === 0){
                    result.body.message.unshift({ title: "全部", id: 0});
                    this.cates = result.body.message;
                }
            })
        },
        getPhotoListByCateID(cateID){
            //根据分类id获取的图片列表
            this.$http.get('api/getimages/'+cateID).then( result => {
                if(result.body.status === 0){
                    this.list = result.body.message;
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

.photo-list{
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li {
        margin-bottom: 10px;
        background-color: #ccc;
        text-align: center;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            position: absolute;
            color: white;
            text-align: left;
            bottom: 0px;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            overflow: hidden;
            .info-title{
                font-size: 14px;
                max-height: 14px;
                overflow: hidden;
            }
            .info-body{
                font-size: 13px;
            }
        }
    }
}
</style>